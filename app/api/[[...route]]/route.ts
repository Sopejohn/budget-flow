import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import accounts from './accounts';

export const runtime = 'edge';

const app = new Hono().basePath('/api');



const routes = app.route('/accounts', accounts);

app
    .get('/hello', 
    clerkMiddleware(),
    (c) => {
        const auth = getAuth(c);

        if (!auth?.userId) {
            return c.json({error: "Unauthorized"});
        }
  return c.json({
    message: 'Hello Next.js!',
    userId: auth.userId,
  });
});

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes;