import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

import dotenv from "dotenv";
dotenv.config();


//create a limiter that allows 10 requests per 20
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(), //connect upstash redis using my env variable
    limiter: Ratelimit.slidingWindow(100, "10 s"),
});
//redis is a db that stores stuff like # of requests. Upstash is a service that gives us Redis without managing servers. 
export default ratelimit;
