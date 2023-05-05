import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeCC'
})
export class PipeCCPipe implements PipeTransform {
  transform(CC: any, arg: any): any {
    const resultPost = [];
    for (const li of CC) {
      if (li.descripcion.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPost.push(li);
      }
    }
    return resultPost;
  }
}
