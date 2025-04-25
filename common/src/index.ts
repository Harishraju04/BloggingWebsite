import {z} from "zod";

export const SignUpSchema = z.object({
    email:z.string().email(),
    name:z.string(),
    password:z.string().min(6)

});

export const updateblogInput = z.object({
    title:z.string(),
    content:z.string()
})

export const createBlogInput = z.object({
    title:z.string(),
    content:z.string(),
})

export const SigninSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6)

});

export const updateprofile = z.object({
    name:z.string().optional(),
    email:z.string().email().optional(),
    description:z.string().optional()
})


export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export type SigninSchemaType = z.infer<typeof SigninSchema>;

export type createBlogInputType = z.infer<typeof createBlogInput>;

export type updateblogInputType = z.infer<typeof updateblogInput>;

export type updateprofileType = z.infer<typeof updateprofile>;