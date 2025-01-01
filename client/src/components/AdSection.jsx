import { useState, useEffect } from "react";
import "../styles/AdSection.css";
import ad1 from "../assets/ad1.webp";
import ad2 from "../assets/ad2.webp";
import ad3 from "../assets/ad3.webp";
import ad4 from "../assets/ad4.webp";
import ad5 from "../assets/ad5.webp";





function AdSection() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const ads = [
        { image: ad1, text: "Hire Me as Your Developer!" },
        { image: ad2, text: "Stay Informed with Neighborhood Alerts!" },
        { image: ad3, text: "Craving Pizza? Order Now!" },
        { image: ad4, text: "Explore Pecos – Discover Local Gems!" },
        { image: ad5, text: "Save Big – Shop the Best Deals!" },
        
        
    ];

    const [currentAd, setCurrentAd] = useState(ads[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomAd = ads[Math.floor(Math.random() * ads.length)];
            setCurrentAd(randomAd);
        }, 2000); 

        return () => clearInterval(interval); 
    }, [ads]);

    return (
        <div className="ad-container">
            <img src={currentAd.image} alt="Ad" />
            <p>{currentAd.text}</p>
            
        </div>
        
    );
}

export default AdSection;
