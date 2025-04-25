import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { Hono } from "hono";
import {SignUpSchema,updateprofile} from "@rajuraju9884/medium-common";
import { SigninSchema } from '@rajuraju9884/medium-common';
import { Auth } from '../Middlewares/Auth';


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
                    password:body.password,
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

//Update Profile

user.get("/v1/profile",Auth,async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  try{
    const res = await prisma.user.findFirst({
      where:{
        id:c.get("userid")
      },
      select:{
        email:true,
        name:true,
        description:true
      }
    })

    return c.json({
      res
    
    })
  }
  catch(err){
    return c.json({
      msg:err
    })
  }


})

user.put("/v1/updateprofile", Auth, async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const parsed = updateprofile.safeParse(body);
  
    if (!parsed.success) {
      c.status(400);
      return c.json({
        msg: "Invalid input",
        error: parsed.error.errors
      });
    }
  
    const { name, email, description } = parsed.data;
  
    // Prevent empty update
    if (!name && !email && !description) {
      c.status(400);
      return c.json({
        msg: "At least one field (email, password, or description) must be provided."
      });
    }
  
    try {
      await prisma.user.update({
        where: {
          id: c.get("userid"),
        },
        data: {
          ...(name && { name }),
          ...(email && { email }),
          ...(description && { description }),
        },
      });
  
      return c.json({
        msg: "Details updated successfully",
      });
    } catch (err) {
      console.error("Prisma update error:", err);
      c.status(500);
      return c.json({
        msg: "Failed to update user details",
      });
    }
  });
  

export default user;