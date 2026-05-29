import { Redis } from '@upstash/redis'
import { config } from 'dotenv'

config()

function redisInit() {
  if(!process.env.UPSTASH_REDIS_REST_URL) {
    throw new Error('UPSTASH_REDIS_REST_URL is not defined in .env');
  }
  if(!process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('UPSTASH_REDIS_REST_TOKEN is not defined in .env');
  }
  
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })

}

const redis: Redis = redisInit();
export default redis