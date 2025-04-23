import { Hono } from 'hono'
import user from './routes/user';
import blog from './routes/blog';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { cors } from 'hono/cors'


const app = new Hono()

app.use('/api/*',cors());

app.route('/api/user',user);
app.route('/api/blog',blog);



export default app
