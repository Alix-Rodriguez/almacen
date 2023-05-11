import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRecepcion'
})
export class FilterRecepcionPipe implements PipeTransform {

  transform(recepcion: any, arg: any): any {
    const resultPost = [];
    for (const pos of recepcion) {
      if (pos.nombre_empresa.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPost.push(pos);
      }
    }
    return resultPost;
  }
}
