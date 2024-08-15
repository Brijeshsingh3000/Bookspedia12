import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { setUserFav } from "../redux/slices/userAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Mystery = () => {
    const ITEM_WIDTH = 300;
    const { data } = useSelector((state) => state.books);
    const [ebooks, setEbooks] = useState([]);
    const [scrollpos, setScrollPos] = useState(0);
    const containerRef = useRef();
    const [favbook, setfavbook] = useState([]);
    const apiURL = import.meta.env.VITE_APP_API_URL;
    const { userid, favbooks } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (data && data.books) {
            const filteredBooks = data.books.filter((book) => book.tags === "Mystery");
            setEbooks(filteredBooks);
        }
    }, [data]);
    //handle horizontal scroll
    const handleScroll = (scrollAmount) => {
        const newScrollPos = scrollpos + scrollAmount;
        setScrollPos(newScrollPos);
        containerRef.current.scrollLeft = newScrollPos;
    }
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
        if (userid) {
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
        <div className="edu-book-container">
            <h3>Mystery Books</h3>
            <div className="act-btn">
                <button onClick={() => handleScroll(-ITEM_WIDTH)}>⮜</button>
                <button onClick={() => handleScroll(ITEM_WIDTH)}>⮞</button>
            </div>
            <div ref={containerRef} className="edu-books" >
                {ebooks && ebooks.map((item, index) => (
                    <div className="edu-book-contents" key={index}>
                        <div className="edu-book-cover">
                            <img style={{ width: "180px", height: "270px" }}
                                src={item.image}
                                alt="/"
                            />
                        </div>
                        <div className="edu-book-info">
                            <h6 style={{ fontSize: "15px", fontWeight: "bold", color: "white" }} className=' my-1 px-2'>{item.bookname.slice(0, 20)}...</h6>
                            <p className='mb-0 text-white' style={{ fontSize: "30px", fontWeight: "bold" }}>Rs. {item.price}</p>
                            <button style={{
                                backgroundColor: "#f46725", color: "white", border: "none", fontWeight: "bold"
                                , borderRadius: "5px"
                            }} className='reads-btn btn btn-primary my-1' onClick={() => navigate(`/detail/${item._id}`)}>View Details</button>
                            {isBookInFav(item._id) ? <button className='btn ' style={{ backgroundColor: "transparent" }}>
                                <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} onClick={() => deletefavbook(item._id)} /></button> :
                                <button className='btn' onClick={() => addtofav(item._id)} style={{ color: "white" }} > <FontAwesomeIcon icon={faStar} /></button>}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
export default Mystery;