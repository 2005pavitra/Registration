const User = require('../models/usermodels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create and Save a new User
const register = async (req, res) => {
    try {
        if(!req.body){
            return res.status(400).json({
                msg: "All the fields are required"
            })
        }
        const { name, email, password } = req.body;

    let user = await User.findOne({
        email
    })
    if (user) {
        return res.status(400).json({
            msg: "User already exits.."
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    user = new User({
        name,
        email,
        password:hashedPassword
    })

    await user.save();
    res.status(200).json({
        msg: "User saved successfully"
    })
    } catch (error) {
        res.status(500).json({
            msg: "Server error"
        })
    }
}

//login

const login = async (req, res) =>{
    try {
        const { email, password } = req.body;
        const user = user.findOne({email});

        if(!user){
            return res.status(400).json({
                msg: "User does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                msg: "Invalid credentials"
            })
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
        res.status(200).json({
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            msg: "Server error in login"
        })
    }
}