import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterConf'
})
export class FilterConfPipe implements PipeTransform {

  transform(conf: any, arg: any): any {
    //  if (arg === '' || arg.length < 4) return Marca;
    const resultPost = [];
    for (const li of conf) {
      if (li.descripcion.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPost.push(li);
      }
    }
    return resultPost;
  }


}
