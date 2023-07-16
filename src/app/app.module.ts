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
import { PagesComponent } from './pages/pages.component';
import { EmpresaComponent } from './pages/empresa/empresa.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CrearAlmacenComponent } from './pages/almacen/crear-almacen/crear-almacen.component';
import { CrearEmpresaComponent } from './pages/empresa/crear-empresa/crear-empresa.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListarEmpresaComponent } from './pages/empresa/listar-empresa/listar-empresa.component';
import { CatalogoClienteComponent } from './pages/catalogo/catalogo-cliente/catalogo-cliente.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ListarClienteComponent } from './pages/catalogo/listar-cliente/listar-cliente.component';
import { FilterClientePipe } from './pipes/filter-cliente.pipe';
import { ListarAlmacenComponent } from './pages/almacen/listar-almacen/listar-almacen.component';
import { FilterAlmacenPipe } from './pipes/filter-almacen.pipe';
import { PipeCCPipe } from './pages/pipe-cc.pipe';
import { RemitenteComponent } from './pages/almacen/remitente/remitente.component';
import { ListarRemitenteComponent } from './pages/almacen/listar-remitente/listar-remitente.component';
import { FilterRPipe } from './pipes/filter-r.pipe';

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
    PagesComponent,
    EmpresaComponent,
    // OrdenCompraComponent,
    CrearAlmacenComponent,
    CrearEmpresaComponent,
    ListarEmpresaComponent,
    // CatalogoComponent,
    CatalogoClienteComponent,
    FilterPipe,
    ListarClienteComponent,
    FilterClientePipe,
    ListarAlmacenComponent,
    FilterAlmacenPipe,
    PipeCCPipe,
    RemitenteComponent,
    ListarRemitenteComponent,
    FilterRPipe,
    BreadcrumbsComponent
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
