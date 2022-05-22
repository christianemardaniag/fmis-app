import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSpecific'
})
export class SearchSpecificPipe implements PipeTransform {
  private residentAddressMatchField: any;
  private permanentAddressMatchField: any;

  transform(items: Array<any>, filter: { [key: string]: any }): Array<any> {
    return items.filter(item => {
      const notMatchingField = Object.keys(filter).find(key => {
        if (key === 'residentAddress') this.residentAddressMatchField = this.checkSubObject(item, filter, key, 'residentAddress');
        if (key === 'permanentAddress') this.permanentAddressMatchField = this.checkSubObject(item, filter, key, 'permanentAddress');
        
        if (filter[key] !== '' && typeof filter[key] === 'string') {
          return !item[key].toLowerCase().includes(filter[key].toLowerCase());
        } else {
          return false;
        }
      });

      return !notMatchingField && !this.residentAddressMatchField && !this.permanentAddressMatchField;

    });

  }

  checkSubObject(item: any, filter: any, key: any, field: string) {
    return Object.keys(filter[field]).find(rAddKey => {
      if (filter[field][rAddKey] !== '') {
        return !item[field][rAddKey].toLowerCase().includes(filter[field][rAddKey].toLowerCase());
      }
      return false;
    })
  }

}
