import { describe, it, expect } from 'vitest';
import { polygonFactory } from './util.ts';
import { Feature } from '@components/MapBox/MapBoxTypes.ts';
import { polygons } from './mockdata.ts'; 

describe('polygonFactory', () => {
    it('should create a basic Feature object with fake coordinates', () => {
        const coordinates = [
            [
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
                [0, 0]
            ]
        ];
        const expectedFeature: Feature = {
            id: '1234',
            type: 'Feature',
            properties: {},
            geometry: {
                coordinates: coordinates,
                type: 'Polygon'
            }
        };

        const result = polygonFactory(coordinates);

        expect(result).toEqual(expectedFeature);
    });

    it('should create a Feature object three sided coordinates from test data', () => {
        const expectedFeature: Feature = {
            id: '1234',
            type: 'Feature',
            properties: {},
            geometry: {
                coordinates: polygons.fourSided,
                type: 'Polygon'
            }
        };

        const result = polygonFactory(polygons.fourSided);

        expect(result).toEqual(expectedFeature);
    });    
});
