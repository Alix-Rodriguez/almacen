import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// MODULOS


import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CrearEmpresaComponent } from './pages/empresa/crear-empresa/crear-empresa.component';
import { CrearAlmacenComponent } from './pages/almacen/crear-almacen/crear-almacen.component';
import { ListarEmpresaComponent } from './pages/empresa/listar-empresa/listar-empresa.component';
import { ProtegerRutasGuard } from './proteger-rutas.guard';
import { CatalogoClienteComponent } from './pages/catalogo/catalogo-cliente/catalogo-cliente.component';


const routes: Routes = [
  
  
  
  
   { 
     path: '', 
    component: PagesComponent,
      canActivateChild:[ProtegerRutasGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'crear-almacen', component: CrearAlmacenComponent },
      { path: 'listar-empresa', component: ListarEmpresaComponent },
      { path: 'crear-empresa', component: CrearEmpresaComponent },
      { path: 'catalogo-cliente', component: CatalogoClienteComponent },
      // { path: 'catalogo', component: CatalogoComponent },
    ],
  },
  
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NopagefoundComponent },
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
