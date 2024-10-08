// Yes more overhead, but it's a separation of concerns, by breaking out the data into a service object
// you get the ability to isolate and test each service instance and method, without having to test the whole of graphql
// but that tiny slice and responsibility more easily
import {
    getOnePolygon,
    getAllPolygonsBySession, 
    createPolygon, 
    updatePolygon,
    deletePolygon,
} from './polygon.service'; 

export default {
    Query: {
        polygon: getOnePolygon,
        polygons: getAllPolygonsBySession,
    },
    Mutation: {
        createPolygon, 
        updatePolygon, 
        deletePolygon, 
    }
};
