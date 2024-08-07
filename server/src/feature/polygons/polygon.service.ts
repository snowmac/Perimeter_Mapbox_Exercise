import { PrismaClient } from "@prisma/client";

// TODO: extract into reusable types 
type Polygon = {
  id: number;
  name: string;
  coordinates: string;
  properties: any;
  mapbox_id: string;
  work_session_id: string;
  updated_at: Date;
  created_at: Date;
};

const prisma = new PrismaClient();

export const getAllPolygonsBySession = async (_, { sessionId }: {sessionId: string}) => {
  return await prisma.polygon.findMany({
    where: { work_session_id: sessionId },
  });
};

export const getOnePolygon = async (_, { id }) => {
  return await prisma.polygon.findUnique({ where: { id: id } });
};

export const createPolygon = async (_, { data }: { data: Polygon }) => {
  return await prisma.polygon.create({
    data: {
      id: data.id,
      name: data.name,
      coordinates: data.coordinates,
      properties: data.properties,
      mapbox_id: data.mapbox_id,
      work_session_id: data.work_session_id,
      updated_at: new Date(),
      created_at: new Date(),
    },
  });
};

export const updatePolygon = async (_, { data }: { data: Polygon }) => {
  return await prisma.polygon.update({
    where: { id: data.id },
    data: {
      name: data.name,
      coordinates: data.coordinates,
      properties: data.properties,
      updated_at: new Date(),
    },
  });
};

export const deletePolygon = async (_, { id }) => {
  // TODO: Tech debt
  // we don't enforce uniqueness on the mapbox_id field, so we have to find many of those
  // then delete them but theres probably only one id / object to delete
  // but we wrote extra code because typescript was complaining
  const polygons = await prisma.polygon.findMany({ where: { mapbox_id: id } });
  const ids = polygons.map((polygon) => polygon.id);

  return await prisma.polygon.deleteMany({ where: { id: { in: ids } } });
};
