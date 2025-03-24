import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container my-4 text-center">
      <h2>Confirmación de Correo</h2>
      <div *ngIf="loading">Verificando token, por favor espere...</div>
      <div *ngIf="!loading && success" class="alert alert-success">
        {{ message }}
      </div>
      <div *ngIf="!loading && !success" class="alert alert-danger">
        {{ message }}
      </div>
      <button class="btn btn-primary mt-3" (click)="navigateHome()">Ir a la página principal</button>
    </div>
  `,
  styles: [`
    .container { max-width: 600px; }
  `]
})
export class ConfirmComponent implements OnInit {
  token: string | null = null;
  message: string = "";
  success: boolean = false;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Leer el token de la query string
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token');
      if (this.token) {
        this.verifyToken(this.token);
      } else {
        this.message = "No se proporcionó token.";
        this.loading = false;
      }
    });
  }

  verifyToken(token: string): void {
    // Llama a tu API de confirmación. Asegúrate de que la URL coincida con la de tu endpoint.
    const url = `https://localhost:7005/api/auth/confirm?token=${encodeURIComponent(token)}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.success = true;
        this.message = res; // O res.message si tu API devuelve un objeto
        this.loading = false;
      },
      error: (err) => {
        this.success = false;
        // Si el token expiró u otro error, muestra el mensaje del error
        this.message = err.error || "Error al confirmar el correo.";
        this.loading = false;
      }
    });
  }

  navigateHome(): void {
    this.router.navigate(['/clientes']);
  }
}
