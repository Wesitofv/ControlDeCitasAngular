import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ClientesComponent } from "./components/clientes/clientes.component";
import { ClienteCreateModalComponent } from './components/cliente-create-modal/cliente-create-modal.component';
import { ClientesListComponent } from "./components/clientes-list/clientes-list.component";
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioCreateModalComponent } from "./components/usuario-create-modal/usuario-create-modal.component";
import { RolesComponent } from "./components/roles/roles.component";
import { CitasComponent } from "./components/citas/citas.component";
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClientesComponent, ClienteCreateModalComponent, ClientesListComponent, UsuariosComponent, UsuarioCreateModalComponent, RolesComponent, CitasComponent, NgbDropdownModule, RouterLink, AuthLoginComponent, AuthRegisterComponent, FullCalendarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'control-de-citas-front';
  constructor(private modalService: NgbModal) {} // Ahora Angular puede inyectar NgbModal

  ngOnInit(): void {
    localStorage.removeItem('token');
      this.openLoginModal();
  }

  openLoginModal(): void {
    const modalRef = this.modalService.open(AuthLoginComponent, { centered: true, backdrop: 'static', keyboard: false });
    modalRef.result.then(
      (result: any) => { // Anotamos 'result' como any
        console.log('Modal de login cerrado con resultado:', result);
      },
      (reason: any) => { // Anotamos 'reason' como any
        console.log('Modal de login descartado:', reason);
        if (!localStorage.getItem('token')) {
          this.openLoginModal();
        }
      }
    );
  }
}
