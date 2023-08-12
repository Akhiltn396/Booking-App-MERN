const express = require("express");
const Hotels = require("../models/Hotel");
const createError = require("../utils/createErr");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("photos");

const createHotel = async (req, res) => {
  try {
    // upload(req, res, (err) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     const newImg = new Hotels({
    //       photos: {
    //         data: req.file.filename,
    //         contentType: "image/png",
    //       },
    //     });
    //     // newImg
    //       // .save()
    //       // .then(() => res.send("success img"))
    //       // .catch((err) => console.log(err));
    //   }
    // });
    const newHotel = new Hotels(req.body);

    const saveHotel = await newHotel.save();

    res.json(saveHotel);
  } catch (error) {
    console.log(error);
  }
};

const updateHotel = async (req, res) => {
  try {
    const updateHotel = await Hotels.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteHotel = async (req, res) => {
  try {
    await Hotels.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted succesfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const getHotel = async (req, res, next) => {
  const { min, max, city } = req.query;
  const mini = parseInt(min);
  const maxi = parseInt(max);

  try {
    const hotels = await Hotels.find({
      city: { $regex: city, $options: "I" },
      cheapestPrice: { $gt: mini || 1, $lt: maxi || 999 },
    }).limit(3);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

const getSingleHotel = async (req, res, next) => {
  const id = req.params.id;

  try {
    const Hotel = await Hotels.findById(id);

    if (!Hotel) return next(createError(501, "Hotel not found"));

    res.status(200).json(Hotel);
  } catch (error) {
    next(error);
  }
};

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      //we use Promise.All because it contains multiple elements
      cities.map((city) => {
        return Hotels.countDocuments({ city: city }); //to get the count
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotels.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotels.countDocuments({ type: "apartment" });
    const resortCount = await Hotels.countDocuments({ type: "resort" });
    const villaCount = await Hotels.countDocuments({ type: "villa" });
    const cabinCount = await Hotels.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getSingleHotel,
  countByCity,
  countByType,
};
