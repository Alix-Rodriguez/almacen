import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterListarOrdenCompra'
})
export class FilterListarRecepcionPipe implements PipeTransform {
  transform(OC: any, arg: any): any {
    const resultPost = [];
    for (const pos of OC) {
      if (pos.referencia.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPost.push(pos);
      }
    }
    return resultPost;
  }
}
