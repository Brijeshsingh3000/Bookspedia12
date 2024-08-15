import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
const Recommendation = () => {
    const { data } = useSelector((state) => state.books);
    const [rbooks, setRbooks] = useState([]);
    const myRecommendation = ["65e582ffb8cb7ab1cdaddf3b", "64b678d72a72e9aae00ddbc9", "658c05955b06eef51aab8b08", "65e4c5626725f7134b986c61", "65e5831bb8cb7ab1cdaddf43", "65e4c2a76725f7134b98083a"];
    useEffect(() => {
        if (data && data.books) {
            const filteredBooks = data.books.filter((book) => myRecommendation.includes(book._id));
            setRbooks(filteredBooks);
        }
    }, [data]);
    const navigate = useNavigate();
    return (
        <div className="recommend-book-container">
            <h3>Recommended Books</h3>
            <div className="re-books" >
                {rbooks && rbooks.map((item, index) => (
                    <div className="re-book-contents" key={index}>
                        <div className="re-book-cover">
                            <img style={{ width: "180px", height: "270px" }}
                                src={item.image}
                                alt="/"
                            />
                        </div>
                        <div className="re-book-info">
                            <h6 style={{ fontSize: "15px", fontWeight: "bold", color: "white" }} className=' my-1 px-2'>{item.bookname.slice(0, 20)}...</h6>
                            <p className='mb-0 text-white' style={{ fontSize: "30px", fontWeight: "bold" }}>Rs. {item.price}</p>
                            <button style={{
                                backgroundColor: "#f46725", color: "white", border: "none", fontWeight: "bold"
                                , borderRadius: "5px"
                            }} className='reads-btn btn btn-primary my-1' onClick={() => navigate(`/detail/${item._id}`)}>View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Recommendation;