-- CreateTable
CREATE TABLE "Polygon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "properties" JSONB NOT NULL,
    "mapbox_id" TEXT NOT NULL,
    "work_session_id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Polygon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkSession" (
    "id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Polygon" ADD CONSTRAINT "Polygon_work_session_id_fkey" FOREIGN KEY ("work_session_id") REFERENCES "WorkSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
