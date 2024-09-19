const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();


app.use(cors());
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const userSchema = new mongoose.Schema({
  username: String,
 email: String,
  mobile: String,
});

const User = mongoose.model("User", userSchema);


app.post("/api/user", async (req, res) => {
  try {
    const newUser = new User(req.body); 
    await newUser.save(); 
    res.status(201).json({
         message: "User data saved successfully!",
         user:newUser,
         success:true,
        });
  } catch (error) {
    res.status(500).json({ error: "Failed to save user data" });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
