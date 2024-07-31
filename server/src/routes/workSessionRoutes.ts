import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (fastify: FastifyInstance, options: FastifyPluginOptions) {
    
    fastify.get('/work-sessions', async (request, reply) => {
        const workSessions = await prisma.workSession.findMany();
        return workSessions;
    });

    fastify.get('/work-sessions/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const workSession = await prisma.workSession.findUnique({
            where: { id },
            include: { polygons: true },
        });
        if (workSession) {
            return workSession;
        }
        reply.code(404).send({ message: 'WorkSession not found' });
    });

    fastify.post('/work-sessions', async (request, reply) => {
        const { polygons } = request.body as { polygons: any[] };
        const newWorkSession = await prisma.workSession.create({
            data: { polygons: { create: polygons } },
        });
        return newWorkSession;
    });

    fastify.put('/work-sessions/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const { polygons } = request.body as { polygons: any[] };
        const updatedWorkSession = await prisma.workSession.update({
            where: { id },
            data: { polygons: { set: polygons } },
        });
        return updatedWorkSession;
    });

    fastify.delete('/work-sessions/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        await prisma.workSession.delete({ where: { id } });
        reply.code(204).send();
    });
}
