// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-auth-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule, NgbModalModule],
//   templateUrl: './auth-login.component.html',
//   styleUrls: ['./auth-login.component.scss']
// })
// export class AuthLoginComponent {
//   loginData = {
//     email: '',
//     password: ''
//   };
//   errorMessage: string = '';

//   constructor(
//     private http: HttpClient,
//     public activeModal: NgbActiveModal,
//     private router: Router
//   ) {}

//   login(): void {
//     // Llama a tu API de autenticación (ajusta la URL según corresponda)
//     this.http.post<any>('https://localhost:7005/api/auth/login', this.loginData)
//       .subscribe({
//         next: (res) => {
//           console.log('Inicio de sesión exitoso', res);
//           // Almacena el token para futuras peticiones
//           localStorage.setItem('token', res.token);
//           // Cierra el modal
//           this.activeModal.close(res.token);
//         },
//         error: (err) => {
//           console.error('Error en inicio de sesión', err);
//           this.errorMessage = 'Credenciales inválidas';
//         }
//       });
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModalModule],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    public activeModal: NgbActiveModal,
    private router: Router
  ) {}

  login(): void {
    this.http.post<any>('https://localhost:7005/api/auth/login', this.loginData)
      .subscribe({
        next: (res) => {
          console.log('Inicio de sesión exitoso', res);
          localStorage.setItem('token', res.token);
          this.activeModal.close(res.token);
          this.router.navigate(['/clientes']); // o a otra ruta protegida
        },
        error: (err) => {
          console.error('Error en inicio de sesión', err);
          this.errorMessage = 'Credenciales inválidas';
        }
      });
  }
}

