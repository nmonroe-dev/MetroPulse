import "../styles/AboutPage.css";
import Navbar from "../components/Navbar";

function AboutPage() {
    return (
        <div className="about-container">
            <Navbar/>
            <h1>About Great News</h1>
            <p>
                Welcome to <strong>Great News</strong>, your go-to platform for curated news updates. We bring you the latest headlines from trusted sources using RSS feed technology, ensuring you stay informed with accurate and timely information.
            </p>
            <h2>Our Mission</h2>
            <p>
                Our mission is to simplify the way you consume news by delivering breaking stories and insightful updates from a variety of reliable sources, all in one place.
            </p>
            <h2>How We Work</h2>
            <p>
                <strong>Great News</strong> leverages RSS feeds to fetch articles from reputable publishers. This technology allows us to aggregate and display news stories in real-time, giving you quick access to the latest updates.
            </p>
            <h2>Our Trusted Source</h2>
            <p>
                We are proud to source news from <a href="https://www.wfaa.com/" target="_blank" rel="noopener noreferrer">WFAA</a>, a trusted and reputable news outlet. The RSS feed we use is regularly updated to provide you with the most current and reliable information.
            </p>
            <h2>Transparency and Attribution</h2>
            <p>
                All articles displayed on our platform are sourced directly from the WFAA RSS feed. We give full credit to the original publishers and do not claim ownership of the content. For more information about WFAA, visit their official website at <a href="https://www.wfaa.com/" target="_blank" rel="noopener noreferrer">WFAA.com</a>.
            </p>
            <h2>Contact Us</h2>
            <p>
                Have feedback or suggestions? We’d love to hear from you! Reach out to us at <a href="mailto:contact@greatnews.com">contact@greatnews.com</a>.
            </p>
        </div>
    );
}

export default AboutPage;
