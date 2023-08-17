import express from "express";

import axios from "axios";
import cheerio from "cheerio";
import { allNews, getSpecificNews } from "../controllers/news.js";
const router = express.Router();

router.get("/", allNews);
router.get("/:newspaperId", getSpecificNews);

export default router;
