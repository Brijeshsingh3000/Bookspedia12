import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';

const Addedbooks = () => {
    const apiURL = import.meta.env.VITE_APP_API_URL;
    const [userId, setUserId] = useState(null);
    const { userid, isAuthenticated } = useSelector((state) => state.auth);
    const [addedbook, setAddedbooks] = useState([]);
    useEffect(() => {
        if (userid) {
            setUserId(userid);
        }
    }, [userid]);
    const getAddedbooks = async () => {
        if (isAuthenticated && userId) {
            try {
                const res = await axios.post(`${apiURL}/api/v1/${userId}/getaddedbooks`);
                setAddedbooks(res.data.books);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        getAddedbooks();
    }, [userId]);
    //removing the book added by user
    const removeBook = async (id) => {
        try {
            const res = await axios.delete(`${apiURL}/api/v1/deleteBook/${id}`);
            if (res.status === 201) {
                getAddedbooks();
                alert("Book deleted successfully!");
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleRemoveBook = (id) => {
        const check = window.prompt("You are about to delete a book from the bookstore. Type 'DELETE' to confirm:");
        if (check === "DELETE") {
            try {
                removeBook(id);
            } catch (error) {
                console.error("Error deleting book:", error);
                alert("An error occurred while deleting the book.");
            }

        } else {
            alert("Book deletion cancelled. Please type 'DELETE' to proceed.");
        }

    }

    return (
        <div className="fav-container">
            <h4>Books Added By You</h4>
            {addedbook.length > 0 ? (
                addedbook.map((item) => (
                    <div key={item._id} className="fav-content">
                        <span>{item.bookname} by <b>{item.author}</b> </span>
                        <button title="remove book" onClick={() => handleRemoveBook(item._id)}>❌</button>
                    </div>
                ))
            ) : (
                <p>No books added by you.</p>
            )}
        </div>
    );
};

export default Addedbooks;
