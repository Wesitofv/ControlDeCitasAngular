// import { Routes } from '@angular/router';
// import { ClientesComponent } from './components/clientes/clientes.component';

// export const routes: Routes = [
//   { path: '', redirectTo: '/clientes', pathMatch: 'full' },
//   { path: 'clientes', component: ClientesComponent }
// ];

import { Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CitasComponent } from './components/citas/citas.component';
import { RolesComponent } from './components/roles/roles.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
import { CalendarioComponent } from './components/calendario/calendario.component';

export const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'citas', component: CitasComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'register', component: AuthRegisterComponent },
  { path: 'login', component: AuthLoginComponent},
  { path: 'calendario', component: CalendarioComponent },
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: '**', redirectTo: '/clientes' }
];
