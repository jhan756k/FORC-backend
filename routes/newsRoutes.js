const express = require("express");
const router = express.Router();
const {
  getNews,
  setNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");

router.route("/").get(getNews).post(setNews);
router.route("/:id").put(updateNews).delete(deleteNews);

module.exports = router;
