import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { setUserFav } from "../redux/slices/userAuth";
import { useNavigate } from "react-router-dom";
const Allbooks = ({ setcheck }) => {
    const { data } = useSelector((state) => state.books);
    const [bookList, setBookList] = useState([]);
    const [selectedgenre, setSelectedgenre] = useState("All");
    const [favbook, setfavbook] = useState([]);
    const apiURL = import.meta.env.VITE_APP_API_URL;
    const { userid, favbooks, isAutheticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Fetch books when the component mounts or when store data changes
    useEffect(() => {
        if (selectedgenre === "All") {
            setBookList(data.books);
        }
        else if (selectedgenre && data.books) {
            const newArr = data.books.filter((book) => book.tags === selectedgenre);
            setBookList(newArr);
        }
    }, [data, selectedgenre]);
    // filter books based on genres
    const genreBook = (e) => {
        setSelectedgenre(e.target.value);
    }
    useEffect(() => {
    }, [selectedgenre]);
    const genres = ["All", "Fiction", "Non-fiction", "Sci-Fi", "Fantasy", "Romance", "Horror", "Educational", "History", "Autobiography", "Comedy", "Adventure", "Mystery"];
    //favbooks code start from here
    //check if book is in fav list
    //get favbook from store
    useEffect(() => {
        setfavbook(favbooks);
    }, [])
    const isBookInFav = (bookid) => {
        if (favbook)
            return favbook.some((book) => book._id === bookid);//to check if id is present in my favbook list
    };
    //get fav books on adding new books
    const getFavbooks = async () => {
        if (userid && isAutheticated) {
            try {
                const res = await axios.get(`${apiURL}/api/v1/${userid}/getfavbook`);
                setfavbook(res.data.favbooklist);
                dispatch(setUserFav({ favbooks: res.data.favbooklist })); // Dispatch the updated favbook list
            } catch (error) {
                console.log(error);
            }
        }
    };
    // add-to-fav
    const addtofav = async (bookid) => {
        if (!userid) alert("Please LogIn to add favourite")
        const res = await axios.patch(`${apiURL}/api/v1/${userid}/addfavbook`, {
            newfavbookId: bookid
        })
        if (res.status === 200) {
            getFavbooks();
        }
    }
    //remove fav book
    const deletefavbook = async (bookid) => {
        try {
            const res = await axios.delete(`${apiURL}/api/v1/${userid}/deletefavbook`, {
                data: { favbookId: bookid }
            });
            if (res.status === 200) {
                getFavbooks();
            }

        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="outer-container">
            <h1 style={{ color: "white", marginTop: "2rem" }}>Explore All Books</h1>
            <div className="filter-books" >

                <select onChange={(e) => genreBook(e)}>
                    {genres.map((genre, ind) => (
                        <option key={ind} value={genre}  >{genre}</option>
                    ))}
                </select>
                <button style={{
                    backgroundColor: "rgb(251, 28, 28)",
                    border: "none",
                    color: "white",
                    marginLeft: "1rem"
                }}
                    onClick={() => setcheck(false)}
                >Go Back</button>
            </div>
            <div className="main-book-container">
                {
                    bookList && bookList.map((item, index) => (
                        <div className='mb-2 box mx-3 mx-4 book-container' key={index}>

                            <div className="book-cover">
                                <img style={{ width: "200px", height: "270px" }}
                                    src={item.image}
                                    alt="/"
                                />
                            </div>

                            <h6 style={{ fontSize: "15px", fontWeight: "bold" }} className='text-white my-1 px-2'>{item.bookname.slice(0, 20)}...</h6>
                            <p className='mb-0 text-white' style={{ fontSize: "30px", fontWeight: "bold" }}>Rs. {item.price}</p>
                            <div className='d-flex justify-content-around align-items-center flex-wrap py-1'>
                                <button style={{
                                    backgroundColor: "#f46725", color: "white", border: "none", fontWeight: "bold"
                                    , borderRadius: "5px"
                                }} className='reads-btn btn btn-primary my-1' onClick={() => navigate(`/detail/${item._id}`)}>View Details</button>
                                {isBookInFav(item._id) ? <button className='btn ' style={{ backgroundColor: "transparent" }}>
                                    <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} onClick={() => deletefavbook(item._id)} /></button> :
                                    <button className='btn' onClick={() => addtofav(item._id)} style={{ color: "white" }} > <FontAwesomeIcon icon={faStar} /></button>}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Allbooks;
Allbooks.propTypes = {
    setcheck: PropTypes.func.isRequired,
}