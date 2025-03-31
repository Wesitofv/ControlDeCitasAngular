import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(): void {
    this.http.post<any>('https://localhost:7005/api/auth/login', this.loginData)
      .subscribe({
        next: (res) => {
          console.log('Inicio de sesión exitoso', res);
          localStorage.setItem('token', res.token);
          // Redirigir a la página de clientes
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          console.error('Error en inicio de sesión', err);
          this.errorMessage = 'Credenciales inválidas';
        }
      });
  }
}
