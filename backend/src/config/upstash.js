import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

import dotenv from "dotenv";
dotenv.config();


//create a limiter that allows 10 requests per 20
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(process.env.UPSTASH_REDIS_REST_URL),
    limiter: Ratelimit.slidingWindow(20, "20 s"),
});

export default ratelimit;