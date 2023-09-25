import express from "express";
import cors from "cors";
import axios from "axios";
import cheerio from "cheerio";
import { allNews, getSpecificNews, woolNews } from "../controllers/news.js";
const router = express.Router();
const app = express();
app.use(cors());
router.get("/", allNews);
router.get("/wool", woolNews);
router.get("/:newspaperId", getSpecificNews);

export default router;
