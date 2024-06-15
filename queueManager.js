const redis=require('redis');
const client=redis.createClient();


function createQueue(clientId){
    client.lpush;(clientId,'queue created',(err)=>{
        if(err){
            console.error('queue creation failed',err);

        }else{
            console.log("queue created for client",clientId);
        }
    });
}


function enqueueRequest(clientId,request){
    client.rPush(clientId,JSON.stringify(request),(err)=>{
        if(err){
            console.error(" Enqueue request failed",err);
        }else{
            console.log("Request enqued for client",clientId);
        }
    });
}

module.exports={createQueue,enqueueRequest};