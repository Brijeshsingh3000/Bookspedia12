import { useEffect, useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import NavBar from '../component/navBar';
const Addbook = () => {
    const apiURL = import.meta.env.VITE_APP_API_URL;
    const { userid } = useSelector((state) => state.auth);
    const [error, seterror] = useState("");
    const [Data, setData] = useState({ bookname: "", description: "", author: "", image: "", readonline: "", price: "", tags: "", addedBy: userid });
    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };
    useEffect(() => {
        if (!userid) {
            toast.error("Log-In to add books");
            return;
        }
    }, [])

    const submit = async (e) => {
        e.preventDefault();
        if (!userid) {
            alert("User not logged in!");
            return;
        }
        if (Data.bookname === "" || Data.description === "" || Data.author === "" || Data.image === "" || Data.tags === "") {
            if (Data.tags === "None") {
                seterror("⚠ Select a tag");
                return;
            }
            seterror(" ⚠ ALL FIELDS ARE REQUIRED");
            return;
        }
        try {
            const res = await axios.post(`${apiURL}/api/v1/add`, Data);
            setData({ bookname: "", description: "", author: "", image: "", readonline: "", price: "", tags: "" });
            if (res.status === 200) {
                toast.success("Book Added to the store!")
            }
        } catch (error) {
            console.log(error);
        }
    }
    const genres = ["None", "Fiction", "Non-fiction", "Sci-Fi", "Fantasy", "Romance", "Horror", "Educational", "History", "Autobiography", "Comedy", "Adventure", "Mystery"]
    useEffect(() => {
        seterror("");
    }, [Data.bookname, Data.description, Data.author, Data.image, Data.tags])//removing error msg as soon as user changes any input fields

    return (
        <>
            <NavBar />
            <div className='addbooksbg container-fluid d-flex justify-content-center allign-items-center'>
                <ToastContainer />
                <div className='addbooks container'>
                    <h1 className='text-white'>Enter Book details</h1>
                    <h6 className='text-white'>Please make sure book details are correct before submiting</h6>
                    <form>
                        <div className="form-group text-white">
                            <label>BookName</label>
                            <input type="text" className="form-control" id="bookname" aria-describedby="emailHelp" placeholder="Enter bookname" name="bookname" onChange={change} value={Data.bookname} />
                        </div>
                        <div className="form-group text-white">
                            <label >Description</label>
                            <textarea className="form-control" id="description" aria-describedby="emailHelp" placeholder="Enter Description" name="description" onChange={change} value={Data.description} />
                        </div>
                        <div className="form-group text-white">
                            <label>Author</label>
                            <input type="text" className="form-control" id="Author" aria-describedby="emailHelp" placeholder="Enter Author" name="author" onChange={change} value={Data.author} />
                        </div>
                        <div className="form-group text-white">
                            <label >Image</label>
                            <input type="text" className="form-control" id="Image" aria-describedby="emailHelp" placeholder="Insert Image Link" name="image" onChange={change} value={Data.image} />
                        </div>
                        <div className="form-group text-white">
                            <label>ReadOnline</label>
                            <input type="text" className="form-control" id="Image" aria-describedby="emailHelp" placeholder="Give E-Book link if available" name="readonline" onChange={change} value={Data.readonline} />
                        </div>
                        <div className="form-group text-white">
                            <label >Price</label>
                            <input type="number" className="form-control" id="Price" aria-describedby="emailHelp" placeholder="Enter Price" name="price" onChange={change} value={Data.price} />
                        </div>
                        <div className="form-group text-white my-2">
                            <label >Tag</label>
                            <select className='horizontal-dropdown' name="tags" onChange={change} value={Data.tags}>
                                {genres.map((item, index) =>

                                    <option key={index}>{item}</option>

                                )}
                            </select>
                        </div>
                        <h6 style={{ color: "red" }}>{error}</h6>
                        <button type="submit" className="btn btn-primary mt-2" onClick={submit}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Addbook;