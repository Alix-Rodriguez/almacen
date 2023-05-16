import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterCliente",
})
export class FilterClientePipe implements PipeTransform {
  transform(clientes: any, arg: any): any {
    const resultPost = [];
    for (const pos of clientes) {
      if (pos.nombre_cliente.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPost.push(pos);
      }
    }
    return resultPost;
  }
}
