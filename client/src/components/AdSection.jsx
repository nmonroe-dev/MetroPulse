import { useState, useEffect } from "react";
import "../styles/AdSection.css";
import ad1 from "../assets/ad1.webp";
import ad2 from "../assets/ad2.webp";
import ad3 from "../assets/ad3.webp";




function AdSection() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const ads = [
        { image: ad1, text: "Hire Me as Your Developer!" },
        { image: ad2, text: "Stay Informed with Neighborhood Alerts!" },
        { image: ad3, text: "Craving Pizza? Order Now!" },
    ];

    const [currentAd, setCurrentAd] = useState(ads[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomAd = ads[Math.floor(Math.random() * ads.length)];
            setCurrentAd(randomAd);
        }, 8000); // Change ad every 8 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [ads]);

    return (
        <div className="ad-container">
            <img src={currentAd.image} alt="Ad" />
            <p>{currentAd.text}</p>
            
        </div>
        
    );
}

export default AdSection;
