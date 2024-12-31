const express = require("express");
const dotenv = require("dotenv").config();
const ConnectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const newstRoutes = require("./routes/newsRoutes");
const { checkToken } = require("./controllers/authControllers");
const fetchNews = require("./services/rssService");
const cron = require("node-cron");


const app = express();

ConnectDB();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth", authRoutes);
app.use("/news", newstRoutes);

fetchNews()
cron.schedule("0 0 * * *", async () => {
    console.log("Fetching news articles...");
    await fetchNews();
});




app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`);
});
