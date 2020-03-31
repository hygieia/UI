import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {filter, map} from 'rxjs/operators';
import { IFeature, IFeatureResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  featureAggregateSprintEstimates = '/api/feature/estimates/aggregatedsprints/';
  featureWip = '/api/feature/estimates/super/';

  featureSprintDetailRoute = '/api/iteration/';

  featureProjectDetailRoute = '/api/scope/';
  featureProjectsByCollectorId = '/api/scopecollector/';
  //featureProjectsByCollectorIdPage = '/api/scopecollector/page/';
  featureTeamDetailRoute = '/api/team/';

  featureTeamsByCollectorId = '/api/teamcollector/';
  featureTeamsByCollectorIdPage = '/api/teamcollector/page/';

  constructor(private http: HttpClient) { }

  fetchSprint (componentId: string, filterTeamId, filterProjectId, agileType: string): Observable<IFeature[]> {
    const params = {
      params: new HttpParams().set('componentId', componentId).set('filterTeamId', filterTeamId).set('filterProjectId', filterProjectId).set('agileType', agileType)
    };

    return this.http.get<IFeatureResponse>(this.featureSprintDetailRoute, params).pipe(
      map(response => response.result));
  }

  fetchProjects() {
    return this.http.get<IFeatureResponse>(this.featureProjectDetailRoute).pipe(
      map(response => response.result));
  }

  fetchTeams() {
    return this.http.get<IFeatureResponse>(this.featureTeamDetailRoute).pipe(
      map(response => response.result));
  }

  fetchAggregateSprintEstimates(componentId, filterTeamId, filterProjectId, estimateMetricType, agileType) {
    const params = {
      params: new HttpParams().set('componentId', componentId).set('filterTeamId', filterTeamId).set('filterProjectId', filterProjectId).set('estimateMetricType', estimateMetricType).set('agileType', agileType)
    };
    return this.http.get<IFeatureResponse>(this.featureAggregateSprintEstimates, params).pipe(
      map(response => response.result));
  }

  fetchFeatureWip(componentId, filterTeamId, filterProjectId, estimateMetricType, agileType) {
    const params = {
      params: new HttpParams().set('componentId', componentId).set('filterTeamId', filterTeamId).set('filterProjectId', filterProjectId).set('estimateMetricType', estimateMetricType).set('agileType', agileType)
    };
    return this.http.get<IFeatureResponse>(this.featureWip, params).pipe(
      map(response => response.result));
  }

  // fetchProjectsByCollectorId(collectorId) {
  //   return this.http.get<IFeatureResponse>(this.featureTeamsByCollectorId + collectorId).pipe(
  //     map(response => response.result));
  // }
  //
  // fetchTeamsByCollectorId(collectorId: string) {
  //   return this.http.get<IFeatureResponse>(this.featureProjectsByCollectorId + collectorId).pipe(
  //     map(response => response.result));
  // }
}
