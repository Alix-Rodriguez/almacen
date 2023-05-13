import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'filterAggProducto'
})
export class FilterAggProductoPipe implements PipeTransform {
   transform(producto: any, filterProducto:any, filterSku:any,filterNP:any,filterModelo:any): any {
    const resultPost = [];
     for (const pos of producto) {
      if (pos.descripcion.toLowerCase().indexOf(filterProducto.toLowerCase()) > -1
       && pos.sku.toLowerCase().indexOf(filterSku.toLowerCase()) > -1 
       && pos.numero_parte.toLowerCase().indexOf(filterNP.toLowerCase()) > -1
       && pos.modelo.toLowerCase().indexOf(filterModelo.toLowerCase()) > -1  ) {
         resultPost.push(pos);
       }
       
     }
     return resultPost;
   }
 
}
