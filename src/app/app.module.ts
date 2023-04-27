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
import { CrearAlmacenComponent } from './pages/almacen/crear-almacen/crear-almacen.component';
import { CrearEmpresaComponent } from './pages/empresa/crear-empresa/crear-empresa.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListarEmpresaComponent } from './pages/empresa/listar-empresa/listar-empresa.component';
import { CrearLayoutComponent } from './pages/almacen/crear-layout/crear-layout.component';
import { CrearLayoutQAComponent } from './pages/almacen/crear-layout-qa/crear-layout-qa.component';
// import { CatalogoComponent } from './pages/catalogo/catalogo/catalogo.component';
import { EtiquetadoComponent } from './pages/catalogo/etiquetado/etiquetado.component';
import { CatalogoUnidadMedidaComponent } from './pages/catalogo/catalogo-unidad-medida/catalogo-unidad-medida.component';
import { ListarProveedorComponent } from './pages/catalogo/listar-proveedor/listar-proveedor.component';
import { ProveedorComponent } from './pages/catalogo/proveedor/proveedor.component';
import { CatalogoDeProductosComponent } from './pages/catalogo/catalogo-de-productos/catalogo-de-productos.component';
import { CatalogoDeRutasComponent } from './pages/catalogo/catalogo-de-rutas/catalogo-de-rutas.component';
import { CatalogoProductoSigComponent } from './pages/catalogo/catalogo-producto-sig/catalogo-producto-sig.component';
import { CatalogoClienteComponent } from './pages/catalogo/catalogo-cliente/catalogo-cliente.component';
import { CatalogoMarcaProductoComponent } from './pages/catalogo/catalogo-marca-producto/catalogo-marca-producto.component';
import { CatalogoUnidadCargaComponent } from './pages/catalogo/catalogo-unidad-carga/catalogo-unidad-carga.component';
import { CatalogCentroCostoComponent } from './pages/orden-compra/catalog-centro-costo/catalog-centro-costo.component';
import { ZonaComponent } from './pages/almacen/zona/zona.component';
import { RackComponent } from './pages/almacen/rack/rack.component';
import { NivelComponent } from './pages/almacen/nivel/nivel.component';
import { LocalidadComponent } from './pages/almacen/localidad/localidad.component';
import { LineaProductoComponent } from './pages/catalogo/linea-producto/linea-producto.component';
import { ZonQAComponent } from './pages/almacen/zona-qa/zon-qa.component';
import { RackQAComponent } from './pages/almacen/rack-qa/rack-qa.component';
import { NivelQAComponent } from './pages/almacen/nivel-qa/nivel-qa.component';
import { LocalidadQAComponent } from './pages/almacen/localidad-qa/localidad-qa.component';

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
    CrearAlmacenComponent,
    CrearEmpresaComponent,
    ListarEmpresaComponent,
    CrearLayoutComponent,
    CrearLayoutQAComponent,
    // CatalogoComponent,
    EtiquetadoComponent,
    CatalogoUnidadMedidaComponent,
    ListarProveedorComponent,
    ProveedorComponent,
    CatalogoDeProductosComponent,
    CatalogoDeRutasComponent,
    CatalogoProductoSigComponent,
    CatalogoClienteComponent,
    CatalogoMarcaProductoComponent,
    CatalogoUnidadCargaComponent,
    CatalogCentroCostoComponent,
    ZonaComponent,
    RackComponent,
    NivelComponent,
    LocalidadComponent,
    LineaProductoComponent,
    ZonQAComponent,
    RackQAComponent,
    NivelQAComponent,
    LocalidadQAComponent,
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
