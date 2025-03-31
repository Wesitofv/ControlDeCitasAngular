import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgbDropdownModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'control-de-citas-front';
  sidebarOpen = true;
  isLogin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ActualizacionLogin en cada evento web
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLogin = event.urlAfterRedirects === '/login';
      }
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}





// import { Component } from '@angular/core';
// import { Router, RouterOutlet, RouterLink } from '@angular/router';
// import { ClientesComponent } from "./components/clientes/clientes.component";
// import { ClienteCreateModalComponent } from './components/cliente-create-modal/cliente-create-modal.component';
// import { ClientesListComponent } from "./components/clientes-list/clientes-list.component";
// import { UsuariosComponent } from './components/usuarios/usuarios.component';
// import { UsuarioCreateModalComponent } from "./components/usuario-create-modal/usuario-create-modal.component";
// import { RolesComponent } from "./components/roles/roles.component";
// import { CitasComponent } from "./components/citas/citas.component";
// import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
// import { AuthRegisterComponent } from './components/auth-register/auth-register.component';
// import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { FullCalendarModule } from '@fullcalendar/angular';
// import { LoginComponent } from './components/auth-login/auth-login.component'; //aca
// import { ConfirmComponent } from "./components/confirm/confirm.component";
// import { CommonModule } from '@angular/common';


// @Component({
//   selector: 'app-root',
//   standalone: true, //cambie aca el login
//   imports: [RouterOutlet, ClientesComponent, ClienteCreateModalComponent, ClientesListComponent, UsuariosComponent, UsuarioCreateModalComponent, RolesComponent, CitasComponent, NgbDropdownModule, RouterLink, LoginComponent, AuthRegisterComponent, FullCalendarModule, ConfirmComponent, CommonModule],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'control-de-citas-front';
//   sidebarOpen = false;

//   toggleSidebar(): void {
//     this.sidebarOpen = !this.sidebarOpen;
//   }


//   constructor(private modalService: NgbModal, private router: Router) {}

//   ngOnInit(): void {
//     // Si la URL contiene /confirm, no eliminamos el token ni abrimos el modal de login.
//     if (this.router.url.startsWith('/confirm')) {
//       return;
//     }

//     // Si no estamos en /confirm, eliminamos el token y abrimos el modal de login
//     localStorage.removeItem('token');
//     this.openLoginModal();
//   }

//   openLoginModal(): void { //aca
//     const modalRef = this.modalService.open(LoginComponent, { centered: true, backdrop: 'static', keyboard: false });
//     modalRef.result.then(
//       (result: any) => {
//         console.log('Modal de login cerrado con resultado:', result);
//       },
//       (reason: any) => {
//         console.log('Modal de login descartado:', reason);
//         if (!localStorage.getItem('token')) {
//           this.openLoginModal();
//         }
//       }
//     );
//   }
// }




//   constructor(private modalService: NgbModal) {} // Ahora Angular puede inyectar NgbModal

//   ngOnInit(): void {
//     localStorage.removeItem('token');
//       this.openLoginModal();
//   }

//   openLoginModal(): void {
//     const modalRef = this.modalService.open(AuthLoginComponent, { centered: true, backdrop: 'static', keyboard: false });
//     modalRef.result.then(
//       (result: any) => { // Anotamos 'result' como any
//         console.log('Modal de login cerrado con resultado:', result);
//       },
//       (reason: any) => { // Anotamos 'reason' como any
//         console.log('Modal de login descartado:', reason);
//         if (!localStorage.getItem('token')) {
//           this.openLoginModal();
//         }
//       }
//     );
//   }
// }
