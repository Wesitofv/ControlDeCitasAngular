import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from './../../services/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  loading$ = this.loadingService.loading$;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/clientes']);
    }
  }

  login(): void {
    this.http.post<any>('https://localhost:7005/api/auth/login', this.loginData)
      .subscribe({
        next: (res) => {
          console.log('Inicio de sesión exitoso', res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('email', this.loginData.email);
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          console.error('Error en inicio de sesión', err);
          this.errorMessage = 'Credenciales inválidas';
        }
      });
  }
}
