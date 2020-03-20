import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRepo, IRepoResponse} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  repoIssueDetailRoute = '/api/gitrequests/type/issue/state/all/';
  repoPullDetailRoute = '/api/gitrequests/type/pull/state/all/';
  repoCommitDetailRoute = '/api/commit/';

  constructor(private http: HttpClient) { }

  fetchIssues(componentId: string, numberOfDays: number): Observable<IRepo[]> {
    const params = {
      params: new HttpParams().set('componentId', componentId).set('numberOfDays', numberOfDays.toFixed(0))
    };
    return this.http.get<IRepoResponse>(this.repoIssueDetailRoute, params).pipe(
      map(response => response.result));
  }

  fetchCommits(componentId: string, numberOfDays: number): Observable<IRepo[]> {
    const params = {
      params: new HttpParams().set('componentId', componentId).set('numberOfDays', numberOfDays.toFixed(0))
    };
    return this.http.get<IRepoResponse>(this.repoCommitDetailRoute, params).pipe(
      map(response => response.result));
  }

  fetchPullRequests(componentId: string, numberOfDays: number): Observable<IRepo[]> {
    const params = {
      params: new HttpParams().set('componentId', componentId).set('numberOfDays', numberOfDays.toFixed(0))
    };
    return this.http.get<IRepoResponse>(this.repoPullDetailRoute, params).pipe(
      map(response => response.result));
  }
}

