import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAlmacen'
})
export class FilterAlmacenPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPost = [];
    for (const pos of value) {
      if (pos.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPost.push(pos);
      }
    }
    return resultPost;
  }

}
