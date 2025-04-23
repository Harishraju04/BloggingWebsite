import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { Hono } from "hono";
import {z} from "zod";
import { updateblogInput,createBlogInput, } from '@rajuraju9884/medium-common';

const blog = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET:string
    };
    Variables: {
        userid: string; 
    };
}>();


blog.use("/v1/blog/*",async (c,next)=>{
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
})

//create a blog

blog.post("/v1/blog",async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    console.log(body);
    const {success} = createBlogInput.safeParse(body);
    console.log(success);
    if(!success){
        c.status(400);
        return c.json({
            msg:"Invalid inputs"
        })
    }

    try{
        const res = await prisma.post.create({
            data:{
                title:body.title,
                content:body.content,
                authorid:c.get('userid')
            },
            select:{
                id:true
            }
        })
        return c.json({
            msg:"blog Created successfully",
            blogid:res.id
        })
    }
    catch(err){
        return c.json({
            msg:err
        })
    }


})

//update the blog (only title and content)
blog.put("/v1/blog",async (c)=>{
     const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
     }).$extends(withAccelerate());
     
     try{
        const body = await c.req.json();
        const {success} = updateblogInput.safeParse(body);
        if(!success){
            c.status(400);
            return  c.json({
                msg:"Invalid Inputs"
            });
        }
        const res = await prisma.post.update({
            where:{
                id:body.blogid
            },
            data:{
                title:body.title,
                content:body.content
            }
        })
        console.log(res);
        return c.json({
            msg:"successfully Updated "+res.id
        })

     }
     catch(err){
        return c.json({
            msg:err
        })
     }
     
        
     
})

//Todo: pagination
blog.get('/v1/blog/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const res = await prisma.post.findMany({
            select:{
                title:true,
                content:true,
                published:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });
        return c.json({
            res
        })
    }
    catch(err){
        c.status(411);
        c.json({
            msg:err
        })
    }
})

blog.get("/v1/blog/:id",async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try{
        const res = await prisma.post.findFirst({
            where:{
                id:id
            },
            select:{
                title:true,
                content:true,
                published:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })

        return c.json({
            blog:res
        })
    }
    catch(err){
        c.status(411);
        return c.json({
            msg:"Error while fetching blog post"
        });
    }

})



export default blog;