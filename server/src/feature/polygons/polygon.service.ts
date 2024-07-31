import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllPolygonsBySession = async (_, {sessionId}) => {
    return await prisma.polygon.findMany({ where: { work_session_id: sessionId } }); 
}

export const getOnePolygon = async (_, {id}) => {
    return await prisma.polygon.findUnique({ where: { id: id } });
}

export const createPolygon = async (_, {data}) => {
    return await prisma.polygon.create(data);
}

export const updatePolygon = async (_, {data}) => {
    return await prisma.polygon.update({where: {id: data.id}, data});
}

export const deletePolygon = async (_, {id}) => {
    return await prisma.polygon.delete({where: {id}});
}

