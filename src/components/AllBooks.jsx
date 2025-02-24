import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../redux/slices/bookSlice";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllBooks() {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.book.books);
    const [allBooks, setAllBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("DESC");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [showModal, setShowModal] = useState(false);
    const [bookData, setBookData] = useState({
        author: "",
        country: "",
        language: "",
        link: "",
        pages: "",
        title: "",
        year: "",
        id: ""
    });

    const [showModal2, setShowModal2] = useState(false);
    const [bookData2, setBookData2] = useState({
        author: "",
        country: "",
        language: "",
        link: "",
        pages: "",
        title: "",
        year: "",
        id: ""
    });

    useEffect(() => {
        getAllBook();
    }, []);

    async function getAllBook() {
        const response = await axios.get('http://64.227.142.191:8080/application-test-v1.1/books');
        setAllBooks(response.data?.data);
        dispatch(getBook(response.data?.data));
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const handleSearchClick = async () => {
        try {
            //To append required query params after API 
            const queryParams = new URLSearchParams();
            //if Title is present than only it should add after ? in API Call
            if (searchQuery) queryParams.append('title', searchQuery);
            //if Sort is present than only it should add after ? in API Call
            if(sortOrder) queryParams.append('DIR', sortOrder);
            const response = await axios.get(`http://64.227.142.191:8080/application-test-v1.1/books?${queryParams.toString()}`);
            setAllBooks(response.data?.data);
            dispatch(getBook(response.data?.data));
            setCurrentPage(1);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleResetClick = () => {
        setSearchQuery("");
        setSortOrder("DESC");
        getAllBook();
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allBooks?.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const result = await axios.post("http://64.227.142.191:8080/application-test-v1.1/books", bookData);
            toast.success("Book Added Successfully!", {
                position: "top-right",
                duration: 2000,
            });

            setTimeout(()=>{
                toast.info("Fetching updated book list!", {
                    position: "top-right",
                    duration: 1000,
                });
            }, 2000)

            setTimeout(()=>{
                //To reset all filter as well 
                handleResetClick();
            }, 3000)
        } catch (error) {
            toast.error(error.message || "Failed to add book!", {
                position: "top-right"
            });
        } finally {
            setShowModal(false);
            setBookData({
                author: "",
                country: "",
                language: "",
                link: "",
                pages: "",
                title: "",
                year: "",
                id: ""
            });
        }
    };

    const handleInputChange2 = (e) => {
        const { name, value } = e.target;
        setBookData2({ ...bookData2, [name]: value });
    };

    function updateBook(book) {
        setBookData2({
            author: book.author,
            country: book.country,
            language: book.language,
            link: book.link,
            pages: book.pages,
            title: book.title,
            year: book.year,
            id: String(book.id)
        })
        setShowModal2(true);
    }

    const handleUpdate = async () => {
        try {
            const result = await axios.put(`http://64.227.142.191:8080/application-test-v1.1/books/${bookData2.id}`, bookData2);
            console.log(result.data);
            toast.success("Book Updated Successfully!", {
                position: "top-right",
                duration: 2000,
            });

            setTimeout(()=>{
                toast.info("Fetching updated book list!", {
                    position: "top-right",
                    duration: 1000,
                });
            }, 2000)

            setTimeout(()=>{
                //To reset all filter as well 
                handleResetClick();
            }, 3000)
        } catch (error) {
            toast.error(error.message || "Failed to update book!", {
                position: "top-right"
            });
        } finally {
            setShowModal2(false);
            setBookData2({
                author: "",
                country: "",
                language: "",
                link: "",
                pages: "",
                title: "",
                year: "",
                id: ""
            });
        }
    };

    const isFormComplete = Object.values(bookData).every(value => value.trim() !== "");

    const isFormComplete2 = Object.values(bookData2).every(value => value.trim() !== "");


    return (
        <>
            <div className="flex justify-center items-center w-[100%]">
                <div className="w-[90%] md:w-[90%]">
                    <div className="my-2">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold px-2 md:px-0">Book Store</h1>
                            <span onClick={()=>setShowModal(true)} className="bg-green-700 px-4 py-2 rounded-md cursor-pointer text-white text-sm">Add New Book</span>
                        </div>
                        <div className="flex items-center flex-wrap">
                            <div className="relative mr-2">
                                <input
                                    type="text"
                                    placeholder="Search by Title"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm mx-2 md:mx-0 my-4 w-[150px]"
                                />
                                <p className="absolute top-1 left-4 bg-white text-green-700">Title</p>
                            </div>
                            <div className="relative mr-2">
                                <select
                                    value={sortOrder}
                                    onChange={handleSortChange}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm mx-2 md:mx-0 my-4 cursor-pointer"
                                >
                                    <option value="ASC">Ascending</option>
                                    <option value="DESC">Descending</option>
                                </select>
                                <p className="absolute top-1 left-4 bg-white text-green-700">Sort By</p>
                            </div>
                            <button
                                onClick={handleSearchClick}
                                className="px-6 py-2 bg-green-700 text-white rounded-md text-sm my-4 mx-2 md:mr-2"
                            >
                                Search
                            </button>
                            <button
                                onClick={handleResetClick}
                                className="px-6 py-2 bg-gray-600 text-white rounded-md text-sm my-4 mx-2 md:mx-0"
                            >
                                Reset
                            </button>
                        </div>
                    </div>


                    <div className="overflow-x-auto rounded-md">
                        <div className="w-full">
                            <table className="min-w-max w-full bg-white border border-gray-200 text-sm text-center">
                                <thead>
                                    <tr className="border-b bg-gray-100">
                                        <th className="px-4 py-2">ID</th>
                                        <th className="px-4 py-2">Title</th>
                                        <th className="px-4 py-2">Author</th>
                                        <th className="px-4 py-2">Year</th>
                                        <th className="px-4 py-2">Country</th>
                                        <th className="px-4 py-2">Pages</th>
                                        <th className="px-4 py-2">Link</th>
                                        <th className="px-4 py-2">Language</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems?.length !== 0 ? (
                                        currentItems?.map((book) => (
                                            <tr key={book.id} className="border-b">
                                                <td className="px-4 py-2">{book.id}</td>
                                                <td className="px-4 py-2">{book.title}</td>
                                                <td className="px-4 py-2">{book.author}</td>
                                                <td className="px-4 py-2">{book.year}</td>
                                                <td className="px-4 py-2">{book.country}</td>
                                                <td className="px-4 py-2">{book.pages}</td>
                                                <td className="px-4 py-2">{book.link}</td>
                                                <td className="px-4 py-2">{book.language}</td>
                                                <td className="px-4 py-2 cursor-pointer text-red-600" onClick={() => { updateBook(book) }}>Update ✎</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={8} className="text-center py-2">No books found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Prev
                        </button>
                        <span className="px-4 py-2">{currentPage}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage * itemsPerPage >= allBooks?.length}
                            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg w-[3/4] md:w-1/2 max-h-[70vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                             <h2 className="text-xl font-bold">Add New Book</h2>
                             <h2 className="font-semibold text-2xl cursor-pointer" onClick={() => setShowModal(false)}>X</h2>
                        </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.keys(bookData)?.map((key) => (
                                    <div className="relative">
                                        <input
                                            key={key}
                                            type="text"
                                            name={key}
                                            placeholder={key.charAt(0).toUpperCase() + key?.slice(1)}
                                            value={bookData[key]}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded-lg w-full"
                                        />
                                        <p className="absolute -top-3 left-2 bg-white text-green-700 text-sm">{key.toUpperCase()}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-5 py-2 rounded-lg border border-black hover:bg-black hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className={`px-5 py-2 rounded-lg text-white ${isFormComplete ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'}`}
                                    disabled={!isFormComplete}
                                >
                                    Add Book
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {showModal2 && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg w-[3/4] md:w-1/2 max-h-[70vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                             <h2 className="text-xl font-bold">Update Book</h2>
                             <h2 className="font-semibold text-2xl cursor-pointer" onClick={() => setShowModal2(false)}>X</h2>
                        </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.keys(bookData2)?.map((key) => (
                                    <div className="relative">
                                        <input
                                            key={key}
                                            type="text"
                                            name={key}
                                            placeholder={key.charAt(0).toUpperCase() + key?.slice(1)}
                                            value={bookData2[key]}
                                            onChange={handleInputChange2}
                                            className="border p-2 rounded-lg w-full"
                                        />
                                        <p className="absolute -top-3 left-2 bg-white text-green-700 text-sm">{key.toUpperCase()}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    onClick={() => setShowModal2(false)}
                                    className="px-5 py-2 rounded-lg border border-black hover:bg-black hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className={`px-5 py-2 rounded-lg text-white ${isFormComplete2 ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'}`}
                                    disabled={!isFormComplete2}
                                >
                                    Update Book
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <ToastContainer />
        </>
    );
}

export default AllBooks;
