import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../component/loading";
import NavBar from "../component/navBar";
import ebook from "../helper/ebook";
import Bookreview from "../component/bookreview";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ViewDetails = () => {
    const apiURL = import.meta.env.VITE_APP_API_URL;
    const { id } = useParams();
    const [currBook, setCurrBook] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [check, setCheck] = useState(false);
    const { userid } = useSelector((state) => state.auth);
    const [showreview, setShowReview] = useState("No Post");
    useEffect(() => {
        const getBook = async () => {
            try {
                const res = await axios.get(`${apiURL}/api/v1/get/${id}`);
                setCurrBook(res.data.book);
            } catch (error) {
                console.log(error);
            }
        }
        getBook();
    }, [id])
    //handle review post
    const handleClick = () => {
        if (!userid) {
            alert("Please Login to add reviews")
            return;
        }
        setCheck(!check);
    }
    //post review
    const postReview = async (id) => {
        try {
            const res = await axios.post(`${apiURL}/api/v1/${userid}/addreview/${id}`, {
                review: newReview
            });
            if (res.status === 201) {
                toast.success("Review Added!");
                setShowReview("A REVIEW HAS BEEN ADDED");
                setNewReview("");
                setCheck(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="book-view-container">
            <ToastContainer />
            <NavBar />
            {currBook ? (
                <>
                    <div className="book-view-content">
                        <img src={currBook.image} alt={currBook.title} /> {/* Ensure currBook.image and currBook.title are valid */}
                        <span><b>Author:{currBook.author}</b></span>
                        <button style={{ backgroundColor: "#d34917", color: "white", border: "none", borderRadius: "5px" }}
                            onClick={() => ebook(currBook.readonline)}
                        >
                            Read Online
                        </button>
                        <h4>{currBook.bookname}</h4>
                        <p>{currBook.description}</p>
                    </div>
                    <div className="book-review">
                        <h1 className="px-2">Book Reviews</h1>
                        <button className="mx-3 my-2" style={{ backgroundColor: "#d34917", color: "white", border: "none", borderRadius: "5px" }}
                            onClick={(() => handleClick())}
                        >
                            Add Review +
                        </button>
                        <div>
                            <textarea placeholder={newReview === "" ? ("Reminder:Please be respectful and constructive and avoid using language that could be hurtful or negative") : ("")} style={{
                                width: "50vw",
                                height: "20vh",
                                display: check ? "block" : "none"
                            }} className="review-box mx-3" type="text" value={newReview} onChange={(e) => setNewReview(e.target.value)} />
                            <button className="post mx-3 my-1" style={{
                                backgroundColor: "#d34917", border: "none",
                                borderRadius: "5px", color: "white",
                                display: check ? "block" : "none"
                            }} onClick={() => postReview(currBook._id)}>Post ▶</button>
                        </div>
                        <div>
                            <Bookreview currId={currBook._id} checkreview={showreview} />
                        </div>
                    </div>
                </>

            ) : (
                <Loading /> // Handle loading state
            )}
        </div>
    )
}

export default ViewDetails;
