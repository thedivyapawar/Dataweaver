import hero from '../assets/images/books.png'
import { Link } from 'react-router-dom';

function Home() {
    return(
        <>
            <div class="md:flex justify-center items-center flex-wrap min-h-[90vh] bg-[#9eb3aa]">
                <div class=" md:w-[40%] px-4 md:px-8">
                    <h1 class="text-[50px] md:text-[4vw] lg:text-[4vw] font-bold md:my-6 lg:my-8  heading1">World of Books</h1>

                    <p class="text-lg font-light">Discover a world of stories, knowledge, and inspiration. Curate your personal library, explore new titles, and keep your favorite books close — all in one place. Let me know if you’d like me to tweak this or add any specific vibe!</p>

                    <Link to="/view-books" class="flex gap-4 my-8">
                        <button class="py-3 px-5 text-white rounded-full bg-black cursor-pointer ">View Books</button>
                    </Link>

                </div>

                <div class=" md:w-[50%] my-8">
                    <img src={hero} alt="" class="w-100 h-100" loading='lazy'/>
                </div>
            </div>

        </>
    )
}

export default Home;