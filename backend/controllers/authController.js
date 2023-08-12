const User = require("../models/User");
const bcrypt  = require("bcryptjs");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const createError = require("../utils/createErr");

const register = async (req,res,next)=>{
    try {
        const salt  = bcrypt.genSaltSync(10)
        const {username,email,password,phone,city,country} = req.body
        const hash =  bcrypt.hashSync(password,salt);

        const newUser = new User({
            username,email,password:hash,phone,city,country
        })

        await newUser.save()

        res.status(200).json("User has been created")
    } catch (error) {
            next(error)
    }

}

const login = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return next(createError(404, "User not found!"));

      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return next(createError(400, "Wrong password or username!"));

      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT
      );

      const { password, isAdmin, ...otherDetails } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
      next(err);
    }
  };

module.exports = {register,login}