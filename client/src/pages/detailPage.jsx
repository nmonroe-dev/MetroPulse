import "../styles/DetailPage.css"
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";



function DetailPage() {
    const location = useLocation();
    const { title, story, img } = location.state;
 
    return (
        <div className="main-container">
            <Navbar />
            <div className="title-container">
                <h1>{title}</h1>
            </div>
            <div className="article-container">
               
                <p><img src={img} alt="Article img" />{story}</p>
            </div>
        </div>
    );
 }
 
 export default DetailPage;
 