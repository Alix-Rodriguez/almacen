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
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { PagesComponent } from './pages/pages.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrdenCompraComponent } from './pages/orden-compra/orden-compra.component';
import { CrearProductoComponent } from './pages/producto/crear-producto/crear-producto.component';
import { CrearAlmacenComponent } from './pages/almacen/crear-almacen/crear-almacen.component';
import { ListarEmpresaComponent } from './pages/empresa/listar-empresa/listar-empresa.component';
import { CrearLayoutComponent } from './pages/almacen/crear-layout/crear-layout.component';
import { CrearLayoutQAComponent } from './pages/almacen/crear-layout-qa/crear-layout-qa.component';

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
    Grafica1Component,
    PagesComponent,
    EmpresaComponent,
    OrdenCompraComponent,
    CrearProductoComponent,
    CrearAlmacenComponent,
    ListarEmpresaComponent,
    CrearLayoutComponent,
    CrearLayoutQAComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
