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

export const getAllPolygonsBySession = async (
  _,
  { sessionId }: { sessionId: string }
) => {
  return await prisma.polygon.findMany({
    where: { work_session_id: sessionId },
  });
};

export const getOnePolygon = async (_, { id }) => {
  return await prisma.polygon.findUnique({ where: { id: id } });
};

export const createPolygon = async (
  _,
  {
    name,
    coordinates,
    properties,
    mapboxId,
    workSessionId,
  }: {
    name: string;
    coordinates: string;
    properties: any;
    mapboxId: string;
    workSessionId: string;
  }
) => {
  // Ensure that workSessionId is a valid value
  if (!workSessionId) {
    throw new Error("Invalid workSessionId");
  }

  return await prisma.polygon.create({
    data: {
      name: name,
      coordinates: coordinates,
      properties: properties,
      mapbox_id: mapboxId,
      work_session_id: workSessionId,
      updated_at: new Date(),
      created_at: new Date(),
    },
  });
};

export const updatePolygon = async (_, { id, name, coordinates, properties }) => {
  return await prisma.polygon.update({
    where: { id },
    data: {
      name: name,
      coordinates: coordinates,
      properties: properties,
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

  const result = await prisma.polygon.deleteMany({ where: { id: { in: ids } } });

  return result;
};
