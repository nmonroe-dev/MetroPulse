import "../styles/NewsCard.css";

function NewsCard({title, description, pubDate, img}) {
    return(
        <div className="news-card">
            
            <div className="text-content">
                <h2>{title}</h2>
                <img src={img} alt="Article img" />
                <p>{description}</p>
                <span>{pubDate}</span>
                <button className="news-card-button">Read More</button>
            </div>
        </div>
    );
}
export default NewsCard;