const redis=require('redis');
const client=redis.createClient();


function processQueue(clientId){
    client.blpop(clientId,0,(err,item)=>{
        if(err){
            console.error('Error proccessing queue:',err);
            return;
        }

        const request=JSON.parse(item[1]);

        console.log('proccessing request:',request);
        setTimeout(()=>{
            console.log('request processed for client',clientId);
        },1000);
    });
}

function startWorker(clientId){
    console.log('Worker started for client',clientId);
}
module.exports={startWorker};