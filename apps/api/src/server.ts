import Fastify from 'fastify';
import cors from '@fastify/cors';
import type { HealthResponse } from '@ai-creator-studio/shared';

const app = Fastify({ logger: true });
await app.register(cors, { origin: true });

app.get('/api/v1/health', async (): Promise<HealthResponse> => ({ status: 'ok', service: 'api', timestamp: new Date().toISOString(), version: '0.1.0' }));

app.setErrorHandler((error, _request, reply) => { app.log.error(error); void reply.status(500).send({ error: 'INTERNAL_SERVER_ERROR', message: 'Ocorreu um erro interno.' }); });

const port = Number(process.env.API_PORT ?? 3333);
const host = process.env.API_HOST ?? '0.0.0.0';
try { await app.listen({ port, host }); } catch (error) { app.log.error(error); process.exit(1); }
