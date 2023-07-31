const express = require("express");
const router = express.Router();
const {
  getNews,
  setNews,
  updateNews,
  deleteNews,
  getPageNews,
} = require("../controllers/newsController");

router.route("/").get(getNews).post(setNews);
router.route("/:id").put(updateNews).delete(deleteNews);
router.route("/getall:id").get(getPageNews);

module.exports = router;
