import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUserFav } from "../redux/slices/userAuth";
import { useNavigate } from "react-router-dom";

const Favbooks = () => {
    const apiURL = import.meta.env.VITE_APP_API_URL;
    const { userid, isAuthenticated } = useSelector((state) => state.auth);
    const [favbook, setFavbooks] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch favorite books from the API
    const getFavbooks = async () => {
        if (isAuthenticated && userid) {
            try {
                const res = await axios.get(`${apiURL}/api/v1/${userid}/getfavbook`);
                setFavbooks(res.data.favbooklist);
                dispatch(setUserFav({ favbooks: res.data.favbooklist })); // Dispatch the updated favbook list
            } catch (error) {
                console.log(error);
            }
        }
    };

    // Fetch favorite books when component mounts or userid changes
    useEffect(() => {
        getFavbooks();
    }, [userid]);

    // Remove a book from favorites
    const removeFavbooks = async (bookId) => {
        if (userid && bookId) {
            try {
                const res = await axios.delete(`${apiURL}/api/v1/${userid}/deletefavbook`, {
                    data: { favbookId: bookId },
                });
                if (res.status === 200) {
                    getFavbooks();
                    toast.success("Book removed");
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to remove book");
            }
        }
    };

    // Handle removing a book
    const handleRemoveBook = (id) => {
        removeFavbooks(id);
    };

    console.log(favbook);
    return (
        <div className="fav-container">
            <ToastContainer />
            <h4>Favourite Books</h4>
            {favbook ? (
                favbook.map((item) => (
                    <div key={item._id} className="fav-content">
                        <span>{item.bookname} by <b>{item.author}</b> </span>
                        <button className="mx-2" style={{
                            color: "#f46725",
                            fontWeight: "bold",
                            textDecoration: "underline"
                        }} title="View" onClick={() => navigate(`/detail/${item._id}`)}>View</button>
                        <button title="remove book" onClick={() => handleRemoveBook(item._id)}>❌</button>
                    </div>
                ))
            ) : (
                <p>No favorite books found.</p>
            )}
        </div>
    );
};

export default Favbooks;
