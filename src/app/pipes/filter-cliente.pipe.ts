import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterCliente",
})
export class FilterClientePipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultPost = [];
    for (const pos of value) {
      if (pos.clave_cliente.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPost.push(pos);
      }
    }
    return resultPost;
  }
}
