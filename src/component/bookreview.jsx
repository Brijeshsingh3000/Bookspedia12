
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
const Bookreview = ({ currId, checkreview }) => {
    const apiURL = import.meta.env.VITE_APP_API_URL;
    const [userReview, setUserReview] = useState("");
    //getting book reviews
    useEffect(() => {
        const getreview = async () => {
            const res = await axios(`${apiURL}/api/v1/reviews/${currId}`);
            setUserReview(res.data);
            if (res.status === 404) {
                console.log("No reviews Found");
            }
        }
        getreview();
    }, [currId, checkreview]);
    return (
        <div>
            <h1>{userReview ? userReview.map((item, index) => (
                <div key={index} className='review-content'>
                    <h6>User: {item.userId.name}</h6>
                    <span>Comment: {item.review} </span>
                </div>
            )) : "NO REVIEW"}</h1>
        </div>
    )
}
export default Bookreview;
Bookreview.propTypes = {
    currId: PropTypes.string.isRequired,
    checkreview: PropTypes.string.isRequired,
};