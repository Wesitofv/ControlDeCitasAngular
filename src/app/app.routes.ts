import { Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CitasComponent } from './components/citas/citas.component';
import { RolesComponent } from './components/roles/roles.component';
import { LoginComponent } from './components/auth-login/auth-login.component';
import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ClienteProfileComponent } from './components/cliente-profile/cliente-profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'clientes', component: ClientesComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'clientes/:id', component: ClienteProfileComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'citas', component: CitasComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'register', component: AuthRegisterComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: '**', redirectTo: '/clientes' }
];
