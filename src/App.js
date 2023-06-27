import './App.css';
import Homepage from "./assets/components/pages/homepage/homepage";
import {Route, Routes, Navigate, useLocation} from "react-router-dom";
import Header from "./assets/components/defaults/header";
import Footer from "./assets/components/defaults/footer";
import NotFound from "./assets/components/pages/not-found/notFound";
import Posts from "./assets/components/pages/posts/posts";
import Login from "./assets/components/pages/login/login";
import NewStory from "./assets/components/pages/story/newStory";
import {JWT} from "./helper/jwt";
import {useEffect, useState} from "react";


function App() {
    const location = useLocation();

    const [loggedIn, setLoggedIn] = useState(JWT.isLoggedIn());

    useEffect(() => {
        setLoggedIn(JWT.isLoggedIn());
    }, [location]);

    return (
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/story/:id" element={<Posts/>}/>
                    <Route path="/story/new" element={loggedIn ? <NewStory/> : <Navigate to="/login"/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    );
}

export default App;
