const PORT = process.env.PORT || 5000;
import userRoutes from "./routes/news.js";
import axios from "axios";
import cheerio from "cheerio"
import express from "express";
const app = express();
const newspapers = [
  {
    name: "thetimes",
    address: "https://www.thetimes.co.uk/environment/climate-change",
    base: "",
  },
  {
    name: "guardian",
    address: "https://www.guardian.co.uk/environment/climate-change",
    base: "",
  },
  {
    name: "telegraph",
    address: "https://www.telegraph.co.uk/climate-change",
    base: "https://www.telegraph.co.uk",
  },
  {
    name: "timesofindia",
    address: "https://timesofindia.indiatimes.com/topic/climate-change",
    base: "",
  },
  {
    name: "unnews",
    address: "https://www.bbc.com/news/science-environment-56837908",
    base: "",
  },
];
const articles = [];

app.get("/", (req, res) => {
  res.json("welcome to climate change");
});

app.use("/news", userRoutes);
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
//dsdsdsdsdsdcsc


// // checking port on local server
// app.listen(PORT, () => {
// console.log(`listening on ${PORT}`);
// });
