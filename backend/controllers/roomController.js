const Hotels = require("../models/Hotel");
const Room = require("../models/Room");


const createRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room({
      ...req.body,
      hotelId:hotelId
    }
      )

    try {
        const savedRoom = await newRoom.save()

       const newData =  await Hotels.findByIdAndUpdate(hotelId,{
            $push:{rooms: savedRoom._id.toString()}
        })
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }

}

const updateRoom = async (req, res, next) => {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRoom);
    } catch (err) {
      next(err);
    }
  };

  const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };


  const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await Hotels.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(err);
    }
  };

  const getRoom = async (req, res, next) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (err) {
      next(err);
    }
  };

  const getRooms = async (req, res, next) => {
    try {
      const id = req.params.hotelid

      const rooms = await Room.find({hotelId:id});
      res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
  };


  module.exports = {createRoom,updateRoom,updateRoomAvailability,deleteRoom,getRoom,getRooms}