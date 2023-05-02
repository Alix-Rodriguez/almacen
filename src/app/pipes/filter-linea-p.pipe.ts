import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLineaP'
})
export class FilterLineaPPipe implements PipeTransform {

  transform(lineaP: any, arg: any): any {
    const resultPost = [];
    for (const li of lineaP) {
      if (li.descripcion.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPost.push(li);
      }
    }
    return resultPost;
  }


}
