const express = require("express");
const createError = require("../utils/createErr");
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getSingleHotel,
  countByCity,
  countByType,
} = require("../controllers/hotelController");
const { verifyAdmin, verifyToken } = require("../utils/verifyToken");
// const {verifyAdmin} = require("../utils/verifyToken")
const router = express.Router();


router.post("/", verifyAdmin, createHotel);

router.put("/:id",verifyAdmin, updateHotel);

//delete

router.delete("/find/:id",verifyAdmin, deleteHotel);

//get all hotels

router.get("/", getHotel);

//Get a single hotel

router.get("/single/:id", getSingleHotel);

router.get("/countByCity",countByCity)
router.get("/countByType",countByType)

module.exports = router;
