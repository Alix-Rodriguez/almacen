import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { PagesComponent } from './pages/pages.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrdenCompraComponent } from './pages/orden-compra/orden-compra.component';
import { CrearProductoComponent } from './pages/producto/crear-producto/crear-producto.component';
import { CrearAlmacenComponent } from './pages/almacen/crear-almacen/crear-almacen.component';
import { CrearEmpresaComponent } from './pages/empresa/crear-empresa/crear-empresa.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent,
    DashboardComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    ProgressComponent,
    PagesComponent,
    EmpresaComponent,
    OrdenCompraComponent,
    CrearProductoComponent,
    CrearAlmacenComponent,
    CrearEmpresaComponent,
    ListarEmpresaComponent,
    CrearLayoutComponent,
    CrearLayoutQAComponent,
    CrearAlmacenSigComponent,
    CatalogoComponent,
    EtiquetadoComponent,
    CatalogoUnidadMedidaComponent,
    ListarProveedorComponent,
    ListarProveedorSigComponent,
    ProveedorComponent,
    CatalogoDeProductosComponent,
    CatalogoDeRutasComponent,
    CatalogoProductoSigComponent,
    CatalogoClienteComponent,
    CatalogoMarcaProductoComponent,
    CatalogoUnidadCargaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
