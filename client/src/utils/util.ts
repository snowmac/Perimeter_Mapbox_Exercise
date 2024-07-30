import { Feature } from '../components/MapBox/MapBoxTypes.ts';

export const polygonFactory = (coordinates: number[][][]): Feature => {
    const uuid = '1234'
    return {
        "id": uuid,
        "type": "Feature",
        "properties": {},
        "geometry": {
            "coordinates": coordinates,
            "type": "Polygon"
        }
    };
}
