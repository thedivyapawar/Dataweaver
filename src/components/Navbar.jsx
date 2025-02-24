import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Navbar() {
    const location = useLocation();
    return(
        <>
            <div className={`flex px-4 md:px-10 py-6 justify-between items-center ${location.pathname === '/' ? 'bg-[#9eb3aa]' : ''}`}>
                <div className="flex gap-2 items-center">
                    <Link to="/"><span className="font-bold text-2xl">Book-Nest</span></Link>
                </div>

            
                <div className="hidden md:flex gap-12 text-sm ">
                <Link
                    to="/"
                    className={`pb-2 text-[16px] ${location.pathname === '/' ? 'border-b-2 border-black' : ''}`}
                >
                    Home
                </Link>
                <Link
                    to="/view-books"
                    className={`pb-2 text-[16px] ${location.pathname === '/view-books' ? 'border-b-2 border-black' : ''}`}
                >
                    View Books
                </Link>
                </div>



                <div className=" flex items-center justify-center ">

                <input type="checkbox" id="modalToggle" className="hidden peer" />

                <a href="https://divya-pawar-portfolio.vercel.app/" target="_blank">
                    <label className="hidden md:block px-5 py-3 tracking-wide rounded-full border border-black cursor-pointer hover:bg-black hover:text-white transition-all ease-out" >
                    Connect Me
                    </label>
                </a>

                <Link to="/view-books" className="md:hidden px-5 py-3 tracking-wide rounded-full border border-black cursor-pointer hover:bg-black hover:text-white transition-all ease-out">
                    View Books
                </Link>

                </div>
                </div>
        </>
    )
}

export default Navbar;