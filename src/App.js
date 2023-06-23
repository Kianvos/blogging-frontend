import './App.css';
import Homepage from "./assets/components/pages/homepage/homepage";
import {Route, Routes} from "react-router-dom";
import Header from "./assets/components/defaults/header";
import Footer from "./assets/components/defaults/footer";
import NotFound from "./assets/components/pages/not-found/notFound";
import Posts from "./assets/components/pages/posts/posts";

function App() {
    return (
        <>
            <Header/>
            <main>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/story/:id" element={<Posts/>}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer/>
        </>
    );
}

export default App;
