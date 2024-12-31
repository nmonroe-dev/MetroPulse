import { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdSection from "../components/AdSection";

function HomePage() {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [latestNews, setLatestNews] = useState([]);
    const [activeView, setActiveView] = useState("filtered"); // State to control which view is active
    const navigate = useNavigate();

    const handleCategoryChange = async (onCategoryChange) => {
        setActiveView("filtered"); // Switch to filtered view
        if (onCategoryChange === "All") {
            setFilteredNews(news);
            return;
        }
        try {
            const getNewsCat = await axios.get(`http://localhost:6006/news/category/${onCategoryChange}`);
            setFilteredNews(getNewsCat.data);
        } catch (error) {
            console.error("Unable to pull news by category", error);
        }
    };

    const getLatest = async () => {
        setActiveView("latest"); // Switch to latest news view
        try {
            console.log("button clicked");
            const latestArticles = await axios.get("http://localhost:6006/news/latest/");
            console.log(latestArticles);
            setLatestNews(latestArticles.data);
        } catch (error) {
            console.error("Unable to get latest news articles", error);
        }
    };

    useEffect(() => {
        const onPageLoad = async () => {
            try {
                const getNews = await axios.get("http://localhost:6006/news/articles");
                setNews(getNews.data);
                setFilteredNews(getNews.data);
            } catch (error) {
                console.error("Unable to pull news", error);
            }
        };
        onPageLoad();
    }, []);

    const handleCardClick = (article) => {
        navigate("/detail", { state: article });
    };

    return (
        <div className="home-container">
            <div className="nav">
                <Navbar onCategoryChange={handleCategoryChange} getLatest={getLatest} />
            </div>
            <div className="home-title">
                <h1>Great News</h1>
            </div>
            <div className="inner-container">
                <div className="left-container"><AdSection /></div>
                <div className="news-cards">
                    <ul>
                        {/* Conditional Rendering Based on Active View */}
                        {activeView === "latest" &&
                            latestNews.map((article) => {
                                const pubDate = new Date(article.pubDate); // Convert pubDate here
                                return (
                                    <li key={article._id} onClick={() => handleCardClick(article)}>
                                        <NewsCard
                                            title={article.title}
                                            description={article.description}
                                            pubDate={pubDate.toLocaleDateString()} // Pass formatted date
                                            img={article.img}
                                        />
                                    </li>
                                );
                            })}
                        {activeView === "filtered" &&
                            filteredNews.map((article) => {
                                const pubDate = new Date(article.pubDate); // Convert pubDate here
                                return (
                                    <li key={article._id} onClick={() => handleCardClick(article)}>
                                        <NewsCard
                                            title={article.title}
                                            description={article.description}
                                            pubDate={pubDate.toLocaleDateString()} // Pass formatted date
                                            img={article.img}
                                        />
                                    </li>
                                );
                            })}
                    </ul>
                </div>
                <div className="right-container"><AdSection /></div>
            </div>
            <div className="footer">Footer content</div>
        </div>
    );
}

export default HomePage;
