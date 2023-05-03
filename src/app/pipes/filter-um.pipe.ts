import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUM'
})
export class FilterUMPipe implements PipeTransform {
  transform(UM: any, arg: any): any {
    const resultPost = [];
   for (const pos of UM) {
      if (pos.descripcion.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPost.push(pos);
      }
    }
    return resultPost;
  }


}
