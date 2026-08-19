const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ===============================
// Register User
// ===============================

const registerUser = async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;


        // Check required fields

        if (!name || !email || !phone || !password) {

            return res.status(400).json({
                success: false,
                message: "Please provide all required fields."
            });

        }


        // Check if user already exists

        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });


        if (existingUser) {

            return res.status(409).json({
                success: false,
                message: "An account with this email already exists."
            });

        }


        // Hash password

        const hashedPassword = await bcrypt.hash(password, 10);


        // Create user

        const user = await User.create({

            name: name.trim(),

            email: email.toLowerCase().trim(),

            phone: phone.trim(),

            password: hashedPassword

        });


        // Send response

        res.status(201).json({

            success: true,

            message: "SAFAR account created successfully.",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                phone: user.phone,

                role: user.role

            }

        });

    } catch (error) {

        console.error("Registration Error:", error);

        res.status(500).json({

            success: false,

            message: "Server error while creating account."

        });

    }

};

// ===============================
// Login User
// ===============================

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;


        // Check required fields

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Please provide email and password."
            });

        }


        // Find user

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });


        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });

        }


        // Compare password

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!passwordMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });

        }


        // Generate JWT

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        // Send response

        res.status(200).json({

            success: true,

            message: "Login successful.",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                phone: user.phone,

                role: user.role

            }

        });


    } catch (error) {

        console.error("Login Error:", error);

        res.status(500).json({

            success: false,

            message: "Server error while logging in."

        });

    }

};


module.exports = {
    registerUser,
    loginUser
};