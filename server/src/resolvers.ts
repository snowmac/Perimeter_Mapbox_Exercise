import polygonResolver from './feature/polygons/polygon';
import workSessionResolver from './feature/workSession/workSession.resolvers'; 

// aggregate resolvers into one include file from the feature collection
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