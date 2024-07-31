import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (fastify: FastifyInstance, options: FastifyPluginOptions) {

    // Retrieve all polygons
    fastify.get('/polygons', async (request, reply) => {
        try {
            const polygons = await prisma.polygon.findMany();
            return polygons;
        } catch (error) {
            fastify.log.error(error);
            reply.code(500).send({ error: 'Failed to retrieve polygons' });
        }
    });

    // Retrieve a specific polygon by ID
    fastify.get('/polygons/:id', async (request, reply) => {
        const { id } = request.params as { id: number };
        try {
            const polygon = await prisma.polygon.findUnique({
                where: { id },
            });
            if (polygon) {
                return polygon;
            }
            reply.code(404).send({ message: 'Polygon not found' });
        } catch (error) {
            fastify.log.error(error);
            reply.code(500).send({ error: 'Failed to retrieve polygon' });
        }
    });

    // Create a new polygon
    fastify.post('/polygons', async (request, reply) => {
        const { name, coordinates, properties, mapbox_id, work_session_id } = request.body as {
            name: string;
            coordinates: string;
            properties: any;
            mapbox_id: string;
            work_session_id: string;
        };
        try {
            const newPolygon = await prisma.polygon.create({
                data: {
                    name,
                    coordinates,
                    properties,
                    mapbox_id,
                    work_session_id,
                },
            });
            reply.code(201).send(newPolygon);
        } catch (error) {
            fastify.log.error(error);
            reply.code(500).send({ error: 'Failed to create polygon' });
        }
    });

    // Update a polygon by ID
    fastify.put('/polygons/:id', async (request, reply) => {
        const { id } = request.params as { id: number };
        const { name, coordinates, properties, mapbox_id, work_session_id } = request.body as {
            name?: string;
            coordinates?: string;
            properties?: any;
            mapbox_id?: string;
            work_session_id?: string;
        };
        try {
            const updatedPolygon = await prisma.polygon.update({
                where: { id },
                data: {
                    name,
                    coordinates,
                    properties,
                    mapbox_id,
                    work_session_id,
                },
            });
            return updatedPolygon;
        } catch (error) {
            fastify.log.error(error);
            reply.code(500).send({ error: 'Failed to update polygon' });
        }
    });

    // Delete a polygon by ID
    fastify.delete('/polygons/:id', async (request, reply) => {
        const { id } = request.params as { id: number };
        try {
            await prisma.polygon.delete({
                where: { id },
            });
            reply.code(204).send();
        } catch (error) {
            fastify.log.error(error);
            reply.code(500).send({ error: 'Failed to delete polygon' });
        }
    });
}
