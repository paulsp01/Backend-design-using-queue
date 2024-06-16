// worker.js
const redis = require("redis");
const client = redis.createClient();

function processQueue(clientId) {
  client.blpop(clientId, 0, (err, item) => {
    if (err) {
      console.error("Error processing queue:", err);
      return;
    }
    const request = JSON.parse(item[1]);
    // Process the request
    console.log("Processing request:", request);
    // Simulate request processing
    setTimeout(() => {
      console.log("Request processed for client:", clientId);
    }, 1000);
  });
}

function startWorker(clientId) {
  console.log("Worker started for client:", clientId);
  processQueue(clientId);
}

module.exports = { startWorker };
