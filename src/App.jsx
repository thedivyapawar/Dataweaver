import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/Navbar";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
const Home = lazy (()=> import (  "./components/Home"));
const AllBooks = lazy (()=> import (  "./components/AllBooks"));
import Error from "./components/Error";

function App() {
    return(
        <>
            <Provider store={store}>
                <Navbar/>
                <Outlet/>
            </Provider>
        </>
    )
}

const myRoutes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Suspense><Home/> </Suspense>
            },
            {
                path:'/view-books',
                element: <Suspense><AllBooks/></Suspense>
            }
        ]
    }
])

export default myRoutes;