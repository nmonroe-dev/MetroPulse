const News = require("../models/NewsSchema");



exports.allArticles = async (req, res) => {
    try {
        const allNews = await News.find();
        res.status(200).json(allNews);
    }catch(error) {
        console.log("Unable to get news articles",error);
        res.status(500).json({message: "Server Error"});
    }
}


exports.getByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const newsCategory = await News.find({ category: { $regex: new RegExp(`^${category}$`, "i") } });
        res.status(200).json(newsCategory);
    } catch (error) {
        console.error("Error filtering by category:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


exports.getLatest = async (req, res) => {
    try {
        const allNews = await News.find();
        const newsReverse = allNews.reverse();
        const newNews = newsReverse.slice(0, 10);
        
        res.status(200).json(newNews);
    }catch(error) {
        console.error("Error fetching by date", error);
        res.status(500).json({message: "Server Error"});
    }
};
