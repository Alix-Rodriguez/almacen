import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterListarRecepcion'
})
export class FilterListarRecepcionPipe implements PipeTransform {
  transform(recepcion: any, arg: any): any {
    const resultPost = [];
    for (const pos of recepcion) {
      if (pos.referencia.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPost.push(pos);
      }
    }
    return resultPost;
  }
}
