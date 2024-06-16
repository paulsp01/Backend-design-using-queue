// queueManager.js
const redis = require('redis');
const client = redis.createClient();

function createQueue(clientId) {
    client.lpush(clientId, 'queue created', (err) => {
        if (err) console.error('Queue creation failed:', err);
        else console.log('Queue created for client:', clientId);
    });
}

function enqueueRequest(clientId, request) {
    client.rpush(clientId, JSON.stringify(request), (err) => {
        if (err) console.error('Enqueue request failed:', err);
        else console.log('Request enqueued for client:', clientId);
    });
}

module.exports = { createQueue, enqueueRequest };
