import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import workSessionRoutes from './workSessionRoutes';
import polygonRoutes from './polygonRoutes'; 


export default async function (fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.register(workSessionRoutes);
    fastify.register(polygonRoutes); 
}
