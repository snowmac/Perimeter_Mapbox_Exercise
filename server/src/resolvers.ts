import polygonResolver from './feature/polygons/ploygon.resolvers';
import workSessionResolver from './feature/workSession/workSession.resolvers'; 

// aggergate resolvers into one include file from the feature collection
export default {
    Query: {
        ...polygonResolver.Query,
        ...workSessionResolver.Query,
    },
    Mutation: {
        ...polygonResolver.Mutation,
        ...workSessionResolver.Mutation,
    }
}