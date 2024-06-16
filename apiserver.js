const  express=require('express');
const jwt=require('jsonwebtoken');
const bodyParser=require('body-parser');
const {createQueue,enqueueRequest}=require('./queueManager');
const {startWorker}=require('./worker');

const app=express();
app.use(bodyParser.json());

function authenticateToken(req,res,next){
    const token=req.header('Authorization').split(' ')[1];
    if(!token) return res.sendStatus(401);
    jwt.verify(token,'secret',(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user=user;
        next();

        
    });
}

app.post('/request',authenticateToken,(req,res)=>{
    const clientId=req.user.username;
    const request=req.body;


    createQueue(clientId);
    enqueueRequest(clientId, request);
    startWorker(clientId);

    res.status(200).send("Request received");
});


app.post("/createQueue", (req, res) => {
  const { clientId } = req.body;

  createQueue(clientId);
  
  res.status(200).send("Queue creation request received");
});

// Endpoint to enqueue a request for a client
app.post("/enqueueRequest", (req, res) => {
  const { clientId, request } = req.body;

  enqueueRequest(clientId, request);

  res.status(200).send("Request enqueued successfully");
});

app.listen(9001,()=>{
    console.log('API server running on port 9001');
});