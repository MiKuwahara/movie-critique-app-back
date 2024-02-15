const express = require("express");
const router = express.Router();

const {getReviews, setReview,updateReview,deleteReview} = require("../controller/reviewController");
const {protect} = require('../middleware/authMiddleware')

router.get("/", protect, getReviews);
router.post("/", protect,setReview);
router.put("/:id",protect, updateReview);
router.delete("/:id",protect,deleteReview);

module.exports = router;