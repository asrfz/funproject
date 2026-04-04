import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try{
        const {success} = await ratelimit.limit("my-limit-key"); //check how many reqs made (returns a true or false)
        if(!success){
            return res.status(429).json({message: "Too many requests"});
        }

        next() //move the request onto the next part in server.js
    } catch(error){
        console.error("error in rateLimiter", error);
        next(error);
    }
}


export default rateLimiter;
