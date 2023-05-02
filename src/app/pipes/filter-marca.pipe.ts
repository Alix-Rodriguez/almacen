import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterMarca'
})
export class FilterMarcaPipe implements PipeTransform {

  transform(Marca: any, arg: any): any {
    //  if (arg === '' || arg.length < 4) return Marca;
    const resultPost = [];
    for (const li of Marca) {
      if (li.marca.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPost.push(li);
      }
    }
    return resultPost;
  }

}
