import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DockerService {
	
	dockerMetaCountRoute : string = "/api/collector/docker/meta/count";

  constructor(private http: HttpClient) { }

	_GetDockerMetaCount : any = function() : Observable<any> {
		return this.http.get(this.dockerMetaCountRoute);
	}
}
