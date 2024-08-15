import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../redux/slices/booksSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import Slider from "../component/banner";
import Recommendation from "../component/recommendation";
import Series from "../component/series";
import Education from "../component/education";
import Adventure from "../component/Adventure";
import Fiction from "../component/fiction";
import Horror from "../component/horror";
import Mystery from "../component/mystery";
import NavBar from "../component/navBar";
import Allbooks from "../component/allbooks";
import Loading from "../component/loading";
const Displaybooks = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.books);
    const [expbooks, setExpbooks] = useState(false);

    // Fetch books when the component mounts or when store data changes
    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);
    if (isLoading) {
        return (
            <Loading />
        );
    }
    return (
        <div className="container">
            <NavBar />
            <div className="banners">
                <div className="banner-title">
                    <h1>Explore globally Best Selling Books</h1>
                    <h4>Discover top global titles and find your next great read.</h4>
                </div>
                <div className="banner-img">
                    <Slider />
                </div>
            </div>

            {expbooks ? (<Allbooks setcheck={setExpbooks} />) : (
                <>
                    <button style={{
                        marginLeft: "90%", backgroundColor: "#d34917", color: "white", fontWeight: "bold"
                        , borderRadius: "5px"
                    }} onClick={() => setExpbooks(true)}>Explore All Books ⇛</button>
                    {/* //Recommendation */}
                    <Recommendation />
                    {/* {World Famous Series} */}
                    <Series />
                    {/* Educational books section*/}
                    <Education />
                    {/* Adventure books section*/}
                    <Adventure />
                    {/* Fictional books section*/}
                    <Fiction />
                    {/* Mystery books section*/}
                    <Mystery />
                    {/* horror books section*/}
                    <Horror />

                </>
            )
            }
        </div>
    );
}

export default Displaybooks;
