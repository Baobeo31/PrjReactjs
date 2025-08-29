//Tạo kết nối Redis 
const redis = require('redis')

const client = redis.createClient({
  url: 'redis://localhost:3001'
})

client.on('error', (err) => console.log("Redis error", err));
client.on("connect", () => console.log("Connect to Redis "));

client.connect()

module.exports = client