import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEtiquetaInOut'
})
export class FilterEtiquetaInOutPipe implements PipeTransform {

  transform(etiqueta: any, arg: any): any {
    console.log(etiqueta);
    const resultPost = [];
    for (const pos of etiqueta) {
      if (pos.nombre_empresa.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPost.push(pos);
      }
    }
    return resultPost;
  }

}
