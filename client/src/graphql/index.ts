import * as polygonMutation from './mutations/polygons';
import * as polygonQuery from './queries/polygons'; 
import * as workSessionMutation from './mutations/workSession'; 
import * as workSessionQuery from './queries/workSession';

export const mutations = {
    ...polygonMutation,
    ...workSessionMutation
}

export const queries = {
    ...polygonQuery,
    ...workSessionQuery
}