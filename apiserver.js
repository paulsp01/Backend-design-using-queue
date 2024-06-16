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


// app.post("/createQueue", async (req, res) => {
//   const { clientId } = req.body;

//   try {
//     await createQueue(clientId);
//     res.status(200).send("Queue creation request received");
//   } catch (err) {
//     console.error("Error creating queue:", err);
//     res.status(500).send("Failed to create queue");
//   }
// });

// // Endpoint to enqueue a request for a client
// app.post("/enqueueRequest", async (req, res) => {
//   const { clientId, request } = req.body;

//   try {
//     await enqueueRequest(clientId, request);
//     res.status(200).send("Request enqueued successfully");
//   } catch (err) {
//     console.error("Error enqueuing request:", err);
//     res.status(500).send("Failed to enqueue request");
//   }
// });
app.listen(9001,()=>{
    console.log('API server running on port 9001');
});