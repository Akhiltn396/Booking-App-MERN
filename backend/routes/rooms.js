const express = require("express");
const { verifyAdmin } = require("../utils/verifyToken");
const { createRoom, updateRoomAvailability, updateRoom, deleteRoom, getRoom, getRooms } = require("../controllers/roomController");

const router = express.Router()

//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//GET

router.get("/:id", getRoom);
//GET ALL

router.get("/rooms/:hotelid", getRooms);

module.exports = router