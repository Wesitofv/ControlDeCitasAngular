import { Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CitasComponent } from './components/citas/citas.component';
import { RolesComponent } from './components/roles/roles.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

export const routes: Routes = [
  { path: 'confirm', component: ConfirmComponent },
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
