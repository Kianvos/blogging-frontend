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
import EditStory from "./assets/components/pages/story/editStory";
import NewPost from "./assets/components/pages/posts/newPost";
import EditPost from "./assets/components/pages/posts/editPost";
import 'react-notifications/lib/notifications.css';



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
                    <Route path="/story/edit/:id" element={loggedIn ? <EditStory/> : <Navigate to="/login"/>}/>

                    <Route path="/post/new/:storyId" element={loggedIn ? <NewPost/> : <Navigate to="/login"/>}/>
                    <Route path="/post/edit/:id" element={loggedIn ? <EditPost/> : <Navigate to="/login"/>}/>

                    <Route path="/login" element={loggedIn ? <Navigate to={"/"}/> : <Login/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    );
}

export default App;
