const express = require("express");
const User = require("../models/userModel");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const { generateToken } = require("../utils/sendToken");
const { authenticateUser } = require("../middleware/authToken");

router.post("/create-account", async (req, res) => {
    const { username, email, imageUrl } = req.body;

    if (!username || !email) {
        return res.status(400).json({
            success: false,
            message: "Missing information Required"
        });
    }
    try {
        let user = await User.findOne({ email });
        if (!user) {
            const password = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcryptjs.hash(password, 10);
            user = await User.create({ username, email, password: hashedPassword, imageUrl });
            await user.save();
        } 

        await generateToken(user, res, 200, "User Logged in Successfully");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in Creating Account",
            error:error.message
        })
    }
})

router.get('/me', authenticateUser,async (req, res) => {
    try {
        const user = req?.user;
        if (!user) {
            return res.status(404).json({
                success: false,
                message:"User not found"
            })
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error : error.message
        })
    }
})

module.exports = router;