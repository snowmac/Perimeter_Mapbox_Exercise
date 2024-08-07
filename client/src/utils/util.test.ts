import { vi, describe, it, expect } from 'vitest';
import { polygonFactory, labelPolygon, getSessionID } from './util.ts';
import { Feature } from '@components/MapBox/MapBoxTypes.ts';
import { polygons } from './mockdata.ts';

vi.mock('nanoid', () => ({
    nanoid: () => '1234'
}));

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

    it('should correctly label a polygon with the given coordinates and label', () => {
        // Example coordinates for a simple square polygon
        const coordinates = [
            [
                [0, 0],
                [1, 0],
                [1, 1],
                [0, 1],
                [0, 0]
            ]
        ];
        const label = 'Center Label';

        const result: Feature = labelPolygon(coordinates, label);

        const expectedFeature: Feature = {
            id: '1234',
            type: 'Feature',
            properties: {
                description: label
            },
            geometry: {
                coordinates: [0.5, 0.5], // Expected centroid of the square polygon
                type: 'Point'
            }
        };

        // Assert the result matches the expected feature
        expect(result).toEqual(expectedFeature);
    });
});


describe('getSessionID tests', () => {
    it('should get the session ID from a fake cookie', () => {
        // Mocking the 'js-cookie' library to return a fake session ID
        vi.mock('js-cookie', () => ({
            default: {
                get: () => 'fakeSessionID'
            }
        }));

        const result = getSessionID();

        expect(result).toBe('fakeSessionID');
    });

    it('should get the session ID from a fake mutation', () => {
        // Mocking the '@apollo/client' library to return a fake session ID
        vi.mock('@apollo/client', () => ({
            gql: () => {},
            useMutation: () => [
                () => ({
                    data: {
                        sessionID: 'fakeSessionID'
                    }
                }),
                {}
            ]
        }));

        const result = getSessionID();

        expect(result).toBe('fakeSessionID');
    });
});
