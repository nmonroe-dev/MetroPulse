const axios = require("axios");
const xml2js = require("xml2js");
const cheerio = require("cheerio");
const News = require("../models/NewsSchema");

const fetchNews = async () => {
    try {
        // Fetch the RSS feed
        const response = await axios.get("https://www.wfaa.com/feeds/syndication/rss/news");
        const xmlData = response.data;

        // Parse the XML data
        const parsedData = await xml2js.parseStringPromise(xmlData, { explicitArray: false });
       

        const articles = parsedData.rss.channel.item.map((article) => ({
            title: article.title,
            description: article.description,
            link: article.link.trim(),
            category: Array.isArray(article.category) ? article.category : [article.category],
            pubDate: new Date(article.pubDate),
           
            img: article.enclosure ? article.enclosure['$'].url : null, // Access the nested url
        }));
         
        const savedArticles = [];

        for (const article of articles) {
            // Check if the article already exists
            const exists = await News.findOne({ link: article.link });

            if (!exists) {
                try {
                    // Fetch the full story page
                    const storyResponse = await axios.get(article.link);
                    const $ = cheerio.load(storyResponse.data);

                    // Extract the story content
                    const storySections = $(".article__body .article__section.article__section_type_text");
                    let fullStory = "";
                    storySections.each((index, section) => {
                        const textContent = $(section).find("p").text();
                        fullStory += `${textContent}\n`;
                    });

                    // Add the full story to the article
                    article.story = fullStory;

                    // Save the article to the database
                    const savedArticle = await News.create(article);
                    savedArticles.push(savedArticle);
                } catch (storyError) {
                    console.error(`Error fetching full story for`, storyError.message);
                }
            }
        }

        
    } catch (error) {
        console.error("Unable to fetch news", error.message);
    }
};

module.exports = fetchNews;
