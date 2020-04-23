export interface IACResponse {
  result: IAC[];
  lastUpdated: number;
}

export interface IAC {
  buildUrl: string;
  startTime: number;
  endTime: number;
  duration: number;
  buildStatus: string;
  sourceChangeSet: any[];
  id: string;
  collectorItemId: string;
  timestamp: number;
  number: string;
  iacTFDetails: IACTerraform[];
  iacStatus: string;
  iacUrl: string;
}

export interface IACTerraform {
  apiToken: string;
}
export interface FlatData{
	run_status : string[],
		range_select_run_group : string[],
		timelines : string[]
	
      
}
export interface IACData {
  flat: FlatData;
areaChart: boolean,
      options: string[],
      dataPoints: [
      {
        name: 'All Builds',
        series: [{
        "name": "2010",
        "value": 7870000
      },
      {
        "name": "2011",
        "value": 8270000
      }]
      }] 
}


export const COLLECTOR_TYPE: string = 'InfrastructureAsCode';