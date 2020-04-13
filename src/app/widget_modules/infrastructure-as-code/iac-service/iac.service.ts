import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IACService {

  // URL for items by type
  private itemsByTypeRoute = '/api/collector/item/type/';

  // URL for items by id
  private itemRoute = '/api/collector/item/';

  // URL for Collector by Type
  private collectorRoute: string = '/api/collector/type/';

  // URL for CollectorItem by ComponentId
  private collectorByComponentIdRoute: string = '/api/collector/item/component/';

  constructor(private http: HttpClient) { }

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
