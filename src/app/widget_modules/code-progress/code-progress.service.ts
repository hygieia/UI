import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICodeProgress, ICodeProgressResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class CodeProgressService {
  codeProgressDetailRoute = '/api/code-progress/status/';

  constructor(private http: HttpClient) { }

  fetchDetails(componentId: string): Observable<ICodeProgress[]> {
    return this.http.get<ICodeProgressResponse>(this.codeProgressDetailRoute + componentId).pipe(map(result => result.result));
  }
}

