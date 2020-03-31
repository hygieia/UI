export interface IFeatureResponse {
  result: IFeature[];
  lastUpdated: number;
}

export interface IFeature {
  id: string;
  collectorItemId: string;
}

