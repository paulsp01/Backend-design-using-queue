const express=require('express');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const bodyParser=require('body-parser');


  const app=express();
  app.use(bodyParser.json());

  const users={};

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