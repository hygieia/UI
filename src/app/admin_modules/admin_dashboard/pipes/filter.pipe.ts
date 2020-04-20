import { Pipe, PipeTransform } from '@angular/core';
import * as lodash from 'lodash';

@Pipe({
  name: 'adminfilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], agrs?: any): any[] {
    console.log(agrs)
    if(!items) return [];
    if(typeof agrs === 'string') {
      const searchText = agrs.toLowerCase();
    if(!searchText) return items;
return items.filter( it => {
      return it.toLowerCase().includes(searchText);
    });
    } else {
      const keys = Object.keys(agrs);
      // if(keys.length == 1) {
      //   const key = keys[0]; //here filter for only one property
      //   const searchText = agrs[key].toLowerCase();
      //   return items.filter( it => {
      //     return it[key].toLowerCase().includes(searchText)
      //   })
      // } else
       if( keys.length > 0) { 
         // let list = lodash.filter(items,agrs)
          //console.log(' list ', list, ' items ', items);
          let list = items.filter(function(obj){

           return keys.every(function(c) {
             console.log(' obje ', obj[c], ' c ', c,' value ' ,agrs[c] )
             if(Array.isArray(obj[c])) {
              console.log(' con', (obj[c].indexOf(agrs[c]) !== -1));
              let isNot = agrs[c].indexOf('!') !== -1;
              if(isNot) {
                return obj[c].indexOf(agrs[c]) == -1
              } else {
                return obj[c].indexOf(agrs[c]) !== -1
              }
             } else {
            return obj[c].toLowerCase().indexOf(agrs[c].toLowerCase()) !== -1
           }
          });
        })
        console.log(' list ', list , ' itesm ', items)
          return list;
      } else {
        return items;
      }
    }

   }
}
