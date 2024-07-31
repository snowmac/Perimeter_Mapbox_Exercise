import polygonDefs from './feature/polygons/polygon.defs';
import worksessionDefs from './feature/workSession/workSession.defs'; 

// aggergate type defs into one include file from the feature collection
export default [
    polygonDefs,
    worksessionDefs,
].join(' ')