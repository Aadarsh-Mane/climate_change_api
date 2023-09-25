const PORT = process.env.PORT || 5000;
import userRoutes from "./routes/news.js";
import axios from "axios";
import cheerio from "cheerio"
import express from "express";
const app = express();
// const newspapers = [
//   {
//     name: "thetimes",
//     address: "https://www.thetimes.co.uk/environment/climate-change",
//     base: "",
//   },
//   {
//     name: "guardian",
//     address: "https://www.guardian.co.uk/environment/climate-change",
//     base: "",
//   },
//   {
//     name: "telegraph",
//     address: "https://www.telegraph.co.uk/climate-change",
//     base: "https://www.telegraph.co.uk",
//   },
//   {
//     name: "timesofindia",
//     address: "https://timesofindia.indiatimes.com/topic/climate-change",
//     base: "",
//   },
//   {
//     name: "unnews",
//     address: "https://www.bbc.com/news/science-environment-56837908",
//     base: "",
//   },
// ];
// const articles = [];

// app.get("/", (req, res) => {
//   res.json("welcome to climate change");
// });

// app.use("/news", userRoutes);
// app.listen(PORT, () => {
//   console.log(`listening on ${PORT}`);
// });
//dsdsdsdsdsdcsc
const newspapers = [
  {
      name: 'economictimes',
      address: 'https://football-observatory.com/WeeklyPost425',
      base: ''
  },
  {
      name: 'fibre2fashion',
      address: 'https://www.fibre2fashion.com/news/yarn-news',
      base: ''
  },
  
]
const woolTerms=[
'wool',
'yarn'
]
const articles = []
const duplicatearticles = []

newspapers.forEach(newspaper => {
  axios.get(newspaper.address)
      .then(response => {
          const html = response.data
          const $ = cheerio.load(html)
     woolTerms.forEach((term1) => {
       $(`a:contains(${term1})`, html).each(function () {
        
        const anchor = $(this);
        const headLine = anchor.text();
        const url = anchor.attr('href');
        const desc = anchor.next('td').text();
         
         
         if(!duplicatearticles.includes(headLine)){
          
           articles.push({
               headLine,
               desc,
               source: newspaper.name,
               url: newspaper.base + url,
           })
           duplicatearticles.push(headLine) 
         }
          })
        })
      })
})




app.get("/vadapav", (req, res) => {
res.json(articles)
});

// checking port on local server
app.listen(PORT, () => {
console.log(`listening on ${PORT}`);
});
