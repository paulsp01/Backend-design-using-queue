const express=require('express');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');


  const app=express();
  app.use(bodyParser.json());

  mongoose.connect("mongodb://127.0.0.1:27017/authDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Define User schema and model
  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

  const User = mongoose.model("User", userSchema);


//   app.get('/',(req,res)=>{
//     res.send('auth server is running');
//   })
  app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      res.status(201).send("User registered");
    } catch (error) {
      res.status(400).send("Error registering user: " + error.message);
    }
  });

 app.post("/login", async (req, res) => {
   const { username, password } = req.body;
   if (!username || !password) {
     return res.status(400).send("Username and password are required");
   }

   try {
     const user = await User.findOne({ username });
     if (user && (await bcrypt.compare(password, user.password))) {
       const token = jwt.sign({ username }, "secret", { expiresIn: "1h" });
       res.json({ token });
     } else {
       res.status(401).send("Invalid credentials");
     }
   } catch (error) {
     res.status(500).send("Error logging in: " + error.message);
   }
 });



  app.listen(1000,()=>{
    console.log("Auth server running on port 1000")
  });