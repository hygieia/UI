export interface ICodeProgressResponse {
  result: ICodeProgress[];
  lastUpdated: number;
}

export interface ICodeProgress {
  name: string;
  url: string;
  units: IUnits[];
}

export interface IUnits {
  name: string;
  version: string;
  jobUrl: string;
  deployed: boolean;
  lastUpdated: number;
  servers: IServers[];
}

export interface IServers {
  name: string;
  online: boolean;
}
