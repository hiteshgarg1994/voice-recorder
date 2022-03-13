import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hightlight'
})
export class HightlightPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    args = (args || '').trim();
    if (!args) {
      return value;
    }
    const re = new RegExp(args, 'gi');
    return value.filter((item:any) => {
      return re.test(item.title) || re.test(item.content);
    });
  }

}

@Pipe({
  name: 'hightlightTxt'
})
export class HightlightSearchPipe implements PipeTransform {

  transform(value: any, args: any): any {
    args = (args || '').trim();
    if (!args) {
      return value;
    }
    const re = new RegExp(args, 'gi');
    return value.replace(re, '<mark>' + args + '</mark>');
  }

}
