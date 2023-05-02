import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUDC'
})
export class FilterUDCPipe implements PipeTransform {

  transform(UDC: any, arg: any): any {
    const resultPost = [];
    for (const pos of UDC) {
      if (pos.descripcion_unidad_carga.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPost.push(pos);
      }
    }
    return resultPost;
  }

}
