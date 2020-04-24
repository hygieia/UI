import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminfilter'
})
export class AdminFilterPipe implements PipeTransform {
  transform(items: any[], agrs?: any): any[] {
    if (!items) return [];
    if (typeof agrs === 'string') {
      const searchText = agrs.toLowerCase();
      if (!searchText) return items;
      return items.filter(it => {
        return it.toLowerCase().includes(searchText);
      });
    } else {
      const keys = Object.keys(agrs);
      if (keys.length > 0) {
        let list = items.filter(function (obj) {
          return keys.every(function (c) {
            if (Array.isArray(obj[c])) {
              let isNot = agrs[c].indexOf('!') !== -1;
              if (isNot) {
                return obj[c].indexOf(agrs[c]) == -1
              } else {
                return obj[c].indexOf(agrs[c]) !== -1
              }
            } else {
              return obj[c].toLowerCase().indexOf(agrs[c].toLowerCase()) !== -1
            }
          });
        })
        return list;
      } else {
        return items;
      }
    }

  }
}
