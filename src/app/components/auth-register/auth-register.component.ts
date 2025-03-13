import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-register',
  standalone: true,
  imports: [FormsModule, NgbModalModule, CommonModule],
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent {
  registerData = {
    nombre: '',
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    this.http.post<any>('https://localhost:7005/api/auth/register', this.registerData)
      .subscribe({
        next: (res) => {
          // En un entorno real, podrías redirigir o iniciar sesión automáticamente
          console.log('Usuario registrado', res);
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          console.error('Error en registro', err);
          this.errorMessage = 'Error en registro';
        }
      });
  }
}
