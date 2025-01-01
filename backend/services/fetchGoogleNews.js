const axios = require("axios");
const xml2js = require("xml2js");
const cheerio = require("cheerio");
const News = require("../models/NewsSchema");

const fetchGoogleNews = async () => {
    const url = 'https://news.google.com/rss/search?q="Reeves+County"+OR+"Pecos+TX"&hl=en-US&gl=US&ceid=US:en';

    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept": "application/rss+xml, application/xml",
            },
        });

        const xmlData = response.data;

        // Parse RSS feed
        const parsedData = await xml2js.parseStringPromise(xmlData, { explicitArray: false });
        if (!parsedData?.rss?.channel?.item) {
            console.error("Unexpected RSS feed structure for Google News");
            return;
        }

        const items = Array.isArray(parsedData.rss.channel.item)
            ? parsedData.rss.channel.item
            : [parsedData.rss.channel.item];

        const articles = items.map((article) => ({
            title: article.title,
            description: article.description,
            link: article.link.trim(),
            pubDate: new Date(article.pubDate),
        }));

        const savedArticles = [];

        for (const article of articles) {
            
            const exists = await News.findOne({ link: article.link });

            if (!exists) {
                try {
                    // Fetch full story
                    const storyResponse = await axios.get(article.link, {
                        headers: {
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                        },
                    });

                    const $ = cheerio.load(storyResponse.data);

                    // Extract full story
                    const storySections = $("article, .story-body, .article-content");
                    let fullStory = "";
                    storySections.each((_, section) => {
                        fullStory += $(section).find("p").text() + "\n";
                    });

                    // Extract image URL
                    const imgTag = $("img").first(); 
                    const imgSrc = imgTag.attr("src") || null;

                    // Save to the database
                    const savedArticle = await News.create({
                        ...article,
                        story: fullStory.trim() || "Full story content could not be retrieved.",
                        img: imgSrc,
                    });
                    savedArticles.push(savedArticle);
                } catch (storyError) {
                    console.error(`Error fetching full story for ${article.link}:`, storyError.message);
                }
            }
        }

        console.log(`Fetched ${articles.length} articles. Saved ${savedArticles.length} new articles.`);
    } catch (error) {
        console.error("Unable to fetch Google News:", error.message);
    }
};

module.exports = fetchGoogleNews;
