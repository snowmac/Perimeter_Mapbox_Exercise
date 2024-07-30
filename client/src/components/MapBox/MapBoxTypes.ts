export interface FeatureCollectionType {
    type: string
    features: Feature[]
}

export interface Feature {
    id: string
    type: string
    properties: Properties
    geometry: Geometry
}

export interface Properties { }

export interface Geometry {
    coordinates: number[][][] | any
    type: string
}
