const userJobSchema = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { fullname, email, phoneNo, password, role } = req.body;

    if (!fullname || !email || !phoneNo || !password || !role) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    // chek email is already regitered or not
    const userEmail = await userJobSchema.findOne({ email });

    if (userEmail) {
      return res
        .status(400)
        .json({ msg: "User already exist with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await userJobSchema.create({
      fullname,
      phoneNo,
      email,
      role,
      password: hashedPassword,
    });
    return res.status(201).json({ msg: "user created successfully", user });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const userEmail = await userJobSchema.findOne({ email });
    if (!userEmail) {
      return res.status(400).json({ msg: "Incorrect email" });
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      userEmail.password
    );
    if (!isPasswordMatched) {
      return res.status(400).json({ msg: "Incorrect  passwordd" });
    }
    // check role
    if (role != userEmail.role) {
      return res.status(400).json({ msg: "Roles are different" });
    }
    // after checking all thing , we create token for that
    const tokenData = {
      userId: userEmail._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        samesite: "strict",
      })
      .json({ msg: "wellcome back", userEmail });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ msg: "logout successfully" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
    try {
      const { fullname, email, bio, skills, phoneNo } = req.body;
      const file = req.file;
  
      // Convert skills from string to array if provided
      let skillsArray = [];
      if (skills) {
        skillsArray = skills.split(",");
      }
  
      // Assuming userId is coming from a middleware or session
      const userId = req._id; // Modify this as per your setup
      console.log("userId", userId);
  
      // Create an object with fields to update
      let updatedData = {};
      if (fullname) updatedData.fullname = fullname;
      if (email) updatedData.email = email;
      if (phoneNo) updatedData.phoneNo = phoneNo;
      if (bio) updatedData['profile.bio'] = bio; // Update nested field in the profile object
      if (skills) updatedData['profile.skills'] = skillsArray; // Update skills in the profile
  
      // Find the user by ID and update their data in one query
      const updatedUser = await userJobSchema.findByIdAndUpdate(
        userId,
        { $set: updatedData }, // Set the new data
        { new: true, runValidators: true } // Return the updated document and validate
      );
  
      // Check if the user was found and updated
      if (!updatedUser) {
        return res.status(400).json({ msg: "User not found" });
      }
  
      // Respond with the updated user details
      return res.status(201).json({
        msg: "User updated successfully",
        user: {
          _id: updatedUser._id,
          fullname: updatedUser.fullname,
          email: updatedUser.email,
          phoneNumber: updatedUser.phoneNo,
          profile: updatedUser.profile,
        },
      });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  
module.exports = { register, loginUser, logout, updateProfile };
