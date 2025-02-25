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
  const [activeView, setActiveView] = useState("filtered");
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  // Dismiss the modal after 55 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
    }, 55000);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = async (onCategoryChange) => {
    setActiveView("filtered");
    if (onCategoryChange === "All") {
      setFilteredNews(news);
      return;
    }
    try {
      const getNewsCat = await axios.get(`https://metropulse-backend.onrender.com/news/category/${onCategoryChange}`);
      setFilteredNews(getNewsCat.data);
    } catch (error) {
      console.error("Unable to pull news by category", error);
    }
  };

  const getLatest = async () => {
    setActiveView("latest");
    try {
      console.log("button clicked");
      const latestArticles = await axios.get("https://metropulse-backend.onrender.com/news/latest/");
      console.log(latestArticles);
      setLatestNews(latestArticles.data);
    } catch (error) {
      console.error("Unable to get latest news articles", error);
    }
  };

  useEffect(() => {
    const onPageLoad = async () => {
      try {
        const getNews = await axios.get("https://metropulse-backend.onrender.com/news/articles");
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
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Please Wait</h2>
            <p>
              The backend is waking up. This may take up to 55 seconds. Thank you for your patience!
            </p>
          </div>
        </div>
      )}
      <div className="nav">
        <Navbar onCategoryChange={handleCategoryChange} getLatest={getLatest} />
      </div>
      <div className="home-title">
        <h1>The MetroPulse</h1>
        <p>Your Source for Real-Time DFW News</p>
      </div>
      <div className="inner-container">
        <div className="left-container">
          <AdSection />
        </div>
        <div className="news-cards">
          <ul>
            {activeView === "latest" &&
              latestNews.map((article) => {
                const pubDate = new Date(article.pubDate);
                return (
                  <li key={article._id} onClick={() => handleCardClick(article)}>
                    <NewsCard
                      title={article.title}
                      description={article.description}
                      pubDate={pubDate.toLocaleDateString()}
                      img={article.img}
                    />
                  </li>
                );
              })}
            {activeView === "filtered" &&
              filteredNews.map((article) => {
                const pubDate = new Date(article.pubDate);
                return (
                  <li key={article._id} onClick={() => handleCardClick(article)}>
                    <NewsCard
                      title={article.title}
                      description={article.description}
                      pubDate={pubDate.toLocaleDateString()}
                      img={article.img}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="right-container">
          <AdSection />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
