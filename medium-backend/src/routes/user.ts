import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { Hono } from "hono";
import {SignUpSchema} from "@rajuraju9884/medium-common";
import { SigninSchema } from '@rajuraju9884/medium-common';


const user = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET:string
    };
    Variables: {
        userid: string; 
    };
}>();



//signup endpoint

user.post("/v1/signup",async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());


    try{
        const body = await c.req.json();
        const {success} = SignUpSchema.safeParse(body);
        if(success){
            const res = await prisma.user.create({
                data:{
                    email:body.email,
                    name:body.name,
                    password:body.password
                }
            })
            const payload = {
                id:res.id
            }
            const token = await sign(payload,c.env.JWT_SECRET);
            return c.json({
                token:token
            })
        }
        else{
            c.status(403);
            return c.json({
                msg:"Invalid inputs"
            });
        }
    }
    catch(err){
        console.log(err);
        c.status(411);
        return c.json({
            msg:"Something went wrong Can't signUp",
            error:err
        })
    }

    
})


//signin Endpoint

user.post("/v1/signin",async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const res = await prisma.user.findUnique({
        where:{
            email:body.email,
        },
        select:{
            id:true,
            password:true,
        }

    });
    if(!res || res.password != body.password){
        return c.json({
            msg: "Invalid email or password",
          });
    }
    const token = await sign({ id: res.id }, c.env.JWT_SECRET);

    return c.json({
    token,
});
    
})

export default user;