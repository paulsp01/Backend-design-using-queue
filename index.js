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
  app.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    const hashedPw=await bcrypt.hash(password);
    users[username] = hashedPw;
    res.status(201).send('User registered');
  });

  app.post('/login',async(req,res)=>{
    const{username,password}=req.body;
    const hashedPw=users[username];
    if(hashedPw&& await bcrypt.compare(password,hashedPw)){
        const token=jwt.sign({username},'secret',{expiresIn:'1h'});
        res.json({token});
    }else{
        res.status(401).send('Invalid credentials');
    }
  });


  app.listen(8000,()=>{
    console.log("Auth server running on port 8000")
  });