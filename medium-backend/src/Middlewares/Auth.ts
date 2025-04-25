import { verify } from "hono/jwt";

export const Auth = async (c,next)=>{
    let token = c.req.header("Authorization");
        if(!token){
            c.status(401);
            return c.json({
                msg:"error:Unauthorized"
            })
        }
        token = token.split(" ")[1];
       try{
        const res = await verify(token,c.env.JWT_SECRET);
        if(res){
            c.set('userid',res.id);
            await next();
        }
        else{
            c.status(403);
            return c.json({
                msg:"you are not logged in"
            })
        }
       }
       catch(err){
            c.status(403);
            return c.json({
                msg:"you are not logged in"
            })
       }
}