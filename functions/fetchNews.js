import axios from "axios";
import cheerio from "cheerio"
import express from "express";
const app = express()
const newspapers = [
    {
        name: 'economictimes',
        address: 'https://economictimes.indiatimes.com/topic/wool-industry/news',
        base: 'https://economictimes.indiatimes.com/topic/wool-industry/news'
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


export const fecthNews = async () => {
    for (const source of newspapers) {
      try {
        const response = await axios.get(source.address);
  
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
                //  desc,
                 source: source.name,
                 url: source.base + url,
             })
             duplicatearticles.push(headLine) 
           }
            })
          })
        }catch (error) {
          console.error(`Error fetching from ${source.name}:`, error);
        }
        
      }
      return articles
    }