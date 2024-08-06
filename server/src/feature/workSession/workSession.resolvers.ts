import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
    Query: {
        worksessionById: async (_, {id}) => {
            return await prisma.workSession.findFirst({ where: { id } }); 
        },
    },
    Mutation: {
        createSession: async () => {
            return await prisma.workSession.create({
                data: {
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                }
            }); 
        },
    }
};
