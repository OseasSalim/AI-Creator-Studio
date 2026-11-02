import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import { createClient, type User } from '@supabase/supabase-js';
import type { HealthResponse } from '@ai-creator-studio/shared';

declare module 'fastify' { interface FastifyRequest { authUser: User | null } }

const app = Fastify({ logger: true });
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
await app.register(cors, { origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' });
app.decorateRequest('authUser', null);

async function requireAuth(request: FastifyRequest, reply: FastifyReply) {
  const header = request.headers.authorization;
  if (!header?.startsWith('Bearer ')) return reply.status(401).send({ error: 'UNAUTHORIZED', message: 'Bearer token obrigatório.' });
  if (!supabase) return reply.status(503).send({ error: 'AUTH_NOT_CONFIGURED', message: 'Supabase não configurado no ambiente.' });
  const token = header.slice('Bearer '.length).trim();
  if (!token) return reply.status(401).send({ error: 'UNAUTHORIZED', message: 'Token inválido.' });
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return reply.status(401).send({ error: 'UNAUTHORIZED', message: 'Token inválido ou expirado.' });
  request.authUser = data.user;
}

app.get('/api/v1/health', async (): Promise<HealthResponse> => ({ status: 'ok', service: 'api', timestamp: new Date().toISOString(), version: '0.1.0' }));
app.get('/api/v1/auth/me', { preHandler: requireAuth }, async (request) => ({ id: request.authUser!.id, email: request.authUser!.email ?? null, fullName: request.authUser!.user_metadata?.full_name ?? null }));
app.setErrorHandler((error, _request, reply) => { app.log.error(error); void reply.status(500).send({ error: 'INTERNAL_SERVER_ERROR', message: 'Ocorreu um erro interno.' }); });

const port = Number(process.env.API_PORT ?? 3333);
const host = process.env.API_HOST ?? '0.0.0.0';
try { await app.listen({ port, host }); } catch (error) { app.log.error(error); process.exit(1); }
