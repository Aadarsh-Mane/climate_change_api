import express from "express";
import axios from "axios";
import cheerio from "cheerio";
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
];

const articles = [];
let nextArticleId = 1; 
;
const fetchArticles = async () => {
  const articles = [];
  const articlesi=[]

  for (const newspaper of newspapers) {
    try {
      const response = await axios.get(newspaper.address);
      const html = response.data;
      const $ = cheerio.load(html);
     
      
      $('a:contains("climate")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        articles.push({
          id:nextArticleId++,
          title,
          url: newspaper.base + url,
          source: newspaper.name,
        });
      });
    } catch (error) {
      console.error(`Error fetching from ${newspaper.name}:`, error);
    }
  }

  return articles;
};

export const allNews = async (req, res) => {
  try {
    const articles = await fetchArticles();
    res.json(articles);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
let specificId=1
export const getSpecificNews = async (req, res) => {
  const newspaperId = req.params.newspaperId;
  const newspaperAddress = newspapers.filter(
    (newspaper) => newspaper.name === newspaperId
  )[0].address;
  const newspaperBase = newspapers.filter(
    (newspaper) => newspaper.name === newspaperId
  )[0].base;
  axios
    .get(newspaperAddress)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const specificArticles = [];
      $('a:contains("climate")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        specificArticles.push({
          id:specificId++,
          title,
          url: newspaperBase + url,
          source: newspaperId,
        });
      });
      res.json(specificArticles);
    })
    .catch((err) => {
      console.log(err);
    });
};
