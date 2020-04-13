import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {  IAC, IACResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class IACService {

  terraformRoute = '/api/terraform/';
  terraformCardRoute = '/api/collector/terraform/card';
  terraformDetailRoute = '/api/collector/terraform';
  terraformDetailCountRunRoute = '/api/collector/terraform/run/count';
  terraformDetailAggregateRunRoute = '/api/collector/terraform/run/aggregate';

   // URL for items by type
  private itemsByTypeRoute = '/api/collector/item/type/';

  // URL for items by id
  private itemRoute = '/api/collector/item/';

  // URL for Collector by Type
  private collectorRoute: string = '/api/collector/type/';

  // URL for CollectorItem by ComponentId
  private collectorByComponentIdRoute: string = '/api/collector/item/component/';


  constructor(private http: HttpClient) { }

  fetchDetails(componentId: string): Observable<IAC[]> {
    const params = {
      params: new HttpParams().set('componentId', componentId)
    };
    return this.http.get<IACResponse>(this.terraformRoute, params).pipe(
      map(response => response.result));
  }

  _GetTerraformDetails: any  = function(): Observable<any> {
	return this.http.get(this.terraformDetailRoute);
  }

  // REST for full organization, workspace and job details
  _GetTerraformCardDetails: any = function(): Observable<any> {
	return this.http.get(this.terraformCardRoute);
  }

  _GetTerraformDetailCountRunRoute: any  = function(workspace, status, timeline, range): Observable<any> {
    const params = {
      params: new HttpParams().set('workspace', workspace).set('status', status).set('timeline', timeline).set('range', range)
    };
	return this.http.get(this.terraformDetailCountRunRoute, params);
  }

  _GetTerraformDetailAggregateRunRoute: any  = function(workspace, status, timeline, range): Observable<any> {
    const params = {
      params: new HttpParams().set('workspace', workspace).set('status', status).set('timeline', timeline).set('range', range)
    };
	return this.http.get(this.terraformDetailAggregateRunRoute, params);
  }

    getItemsByType(type: string, params: any): Observable<any> {
    return this.http.get(this.itemsByTypeRoute + type, {params});
  }

  searchItems(type: string, filter: string): Observable<any> {
    return this.getItemsByType(type, {search: filter, size: 20});
  }

  getItemsById(id: string): Observable<any> {
    return this.http.get(this.itemRoute + id);
  }

  createCollectorItem(collectorItem: any): Observable<any> {
     return this.http.post(this.itemRoute, collectorItem);
  }

  getCollectorByType(collectorType: string): Observable<any> {
	return this.http.get(this.collectorRoute + collectorType);
  }

  getCollectorByComponentId(componentId: string): Observable<any> {
	return this.http.get(this.collectorByComponentIdRoute + componentId);
  }

  
}
