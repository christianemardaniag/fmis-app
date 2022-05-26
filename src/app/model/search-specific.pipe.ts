import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSpecific'
})
export class SearchSpecificPipe implements PipeTransform {
  private residentAddressMatchField: any;
  private permanentAddressMatchField: any;
  private elementaryMatchField: any;
  private secondaryMatchField: any;
  private vocationalMatchField: any;
  private collegeMatchField: any;
  private graduateMatchField: any;
  private civilServiceMatchField: any;
  private workMatchField: any;
  private seminarMatchField: any;

  transform(items: Array<any>, filter: { [key: string]: any }): Array<any> {
    console.log(items);

    return items.filter(item => {
      const notMatchingField = Object.keys(filter).find(key => {
        if (key === 'residentAddress') this.residentAddressMatchField = this.checkChildObject(item, filter, 'residentAddress');
        if (key === 'permanentAddress') this.permanentAddressMatchField = this.checkChildObject(item, filter, 'permanentAddress');
        if (key === 'elementary') this.elementaryMatchField = this.checkChildObject(item, filter, 'elementary');
        if (key === 'secondary') this.secondaryMatchField = this.checkChildObject(item, filter, 'secondary');
        if (key === 'vocational') this.vocationalMatchField = this.checkGrandChildObject(item, filter, 'vocational');
        if (key === 'college') this.collegeMatchField = this.checkGrandChildObject(item, filter, 'college');
        if (key === 'graduateStudies') this.graduateMatchField = this.checkGrandChildObject(item, filter, 'graduateStudies');
        if (key === 'workExperience') this.workMatchField = this.checkGrandChildObject(item, filter, 'workExperience');
        if (key === 'seminars') this.seminarMatchField = this.checkGrandChildObject(item, filter, 'seminars');


        if (filter[key] !== '' && typeof filter[key] === 'string') {
          if (filter[key] === 'male') {
            return item[key].toLowerCase() !== filter[key].toLowerCase();
          }
          return !item[key].toLowerCase().includes(filter[key].toLowerCase());
        } else {
          return false;
        }
      });

      return !notMatchingField
        && !this.residentAddressMatchField
        && !this.permanentAddressMatchField
        && !this.elementaryMatchField
        && !this.secondaryMatchField
        && !this.vocationalMatchField
        && !this.collegeMatchField
        && !this.civilServiceMatchField
        && !this.graduateMatchField
        && !this.workMatchField
        && !this.seminarMatchField
        ;

    });

  }

  checkChildObject(item: any, filter: any, field: string) {
    return Object.keys(filter[field]).find(rAddKey => {
      if (filter[field][rAddKey] !== '') {
        return !item[field][rAddKey].toLowerCase().includes(filter[field][rAddKey].toLowerCase());
      }
      return false;
    })
  }

  checkGrandChildObject(item: any, filter: any, field: string) {
    return Object.keys(filter[field]).find(rAddKey => {
      if (filter[field][rAddKey] !== '') {
        const vocational = item[field];
        const itemCtr = vocational.length;
        const filterCtr = filter[field]['ctr'];
        let isCheckAll = false;

        for (let i = 0; i < itemCtr; i++) {
          for (let x = 0; x <= filterCtr; x++) {
            const element = filter[field][x];
            isCheckAll = !Object.keys(element).find(key => {
              if (element[key] !== '' && typeof vocational[i][key] === 'string') {
                return !vocational[i][key].toLowerCase().includes(element[key].toLowerCase());                      
              }
              return false;
            });
            if (isCheckAll) return !isCheckAll;
          }
        }
        return !isCheckAll;
      }
      return false;
    })
  }

}
