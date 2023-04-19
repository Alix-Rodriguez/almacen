import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { CrearEmpresaComponent } from './pages/empresa/crear-empresa/crear-empresa.component';
import { OrdenCompraComponent } from './pages/orden-compra/orden-compra.component';
import { CrearProductoComponent } from './pages/producto/crear-producto/crear-producto.component';
import { CrearAlmacenComponent } from './pages/almacen/crear-almacen/crear-almacen.component';
import { ListarEmpresaComponent } from './pages/empresa/listar-empresa/listar-empresa.component';
import { CrearLayoutComponent } from './pages/almacen/crear-layout/crear-layout.component';
import { CrearLayoutQAComponent } from './pages/almacen/crear-layout-qa/crear-layout-qa.component';
import { CrearAlmacenSigComponent } from './pages/almacen/crear-almacen-sig/crear-almacen-sig.component';
import { CatalogoComponent } from './pages/producto/catalogo/catalogo.component';
import { EtiquetadoComponent } from './pages/producto/etiquetado/etiquetado.component';
import { CatalogoUnidadMedidaComponent } from './pages/producto/catalogo-unidad-medida/catalogo-unidad-medida.component';
import { ListarProveedorComponent } from './pages/producto/listar-proveedor/listar-proveedor.component';
import { ListarProveedorSigComponent } from './pages/producto/listar-proveedor-sig/listar-proveedor-sig.component';
import { ProveedorComponent } from './pages/producto/proveedor/proveedor.component';
import { CatalogoDeProductosComponent } from './pages/producto/catalogo-de-productos/catalogo-de-productos.component';
import { CatalogoDeRutasComponent } from './pages/producto/catalogo-de-rutas/catalogo-de-rutas.component';
import { CatalogoProductoSigComponent } from './pages/producto/catalogo-producto-sig/catalogo-producto-sig.component';
import { CatalogoClienteComponent } from './pages/producto/catalogo-cliente/catalogo-cliente.component';
import { CatalogoMarcaProductoComponent } from './pages/producto/catalogo-marca-producto/catalogo-marca-producto.component';
import { CatalogoUnidadCargaComponent } from './pages/producto/catalogo-unidad-carga/catalogo-unidad-carga.component';


const routes: Routes = [
  { 
    path: '', 
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'crear-empresa', component: CrearEmpresaComponent },
      { path: 'order-compra', component: OrdenCompraComponent },
      { path: 'crear-producto', component: CrearProductoComponent },
      { path: 'crear-almacen', component: CrearAlmacenComponent },
      { path: 'listar-empresa', component: ListarEmpresaComponent },
      { path: 'crear-layout', component: CrearLayoutComponent },
      { path: 'crear-layout-qa', component: CrearLayoutQAComponent },
      { path: 'crear-almacen-sig', component: CrearAlmacenSigComponent },
      { path: 'catalogo', component: CatalogoComponent },
      { path: 'etiquetado', component: EtiquetadoComponent },
      { path: 'CatalogoUniMed', component: CatalogoUnidadMedidaComponent },
      { path: 'listar-prov', component:ListarProveedorComponent},
      { path: 'listar-prov-sig', component:ListarProveedorSigComponent},
      { path: 'proveedor', component:ProveedorComponent},
      { path: 'catalogo-productos', component:CatalogoDeProductosComponent},
      { path: 'catalogo-rutas', component:CatalogoDeRutasComponent},
      { path: 'catalogo-productos-sig', component:CatalogoProductoSigComponent},
      { path: 'catalogo-cliente', component:CatalogoClienteComponent},
      { path: 'cata-marca-prod', component:CatalogoMarcaProductoComponent},
      { path: 'ca-uni-carga', component: CatalogoUnidadCargaComponent },

      
    ]
  },
  
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', component: NopagefoundComponent },
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
