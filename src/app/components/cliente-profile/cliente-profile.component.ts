import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClienteService, Cliente } from './../../services/cliente.service';

@Component({
  selector: 'app-cliente-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cliente-profile.component.html',
  styleUrls: ['./cliente-profile.component.scss']
})
export class ClienteProfileComponent implements OnInit {
  cliente: Cliente | null = null;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private router: Router   // Inyectar Router aquí
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clienteService.getClienteById(id).subscribe({
        next: (data) => {
          this.cliente = data;
        },
        error: (err) => {
          console.error('Error al obtener cliente', err);
          this.errorMessage = 'No se pudo cargar el perfil del cliente.';
        }
      });
    }
  }

  updateCliente(): void {
    if (this.cliente) {
      // Asegurarse de que la fecha se convierte a ISO, si es necesario
      if (this.cliente.fechaCumple) {
        this.cliente.fechaCumple = new Date(this.cliente.fechaCumple).toISOString();
      }
      console.log('Datos enviados para actualización:', this.cliente);
      this.clienteService.updateCliente(this.cliente.id, this.cliente).subscribe({
        next: () => {
          alert('Perfil actualizado correctamente');
          // Opcional: Recargar los datos para confirmar cambios
          this.ngOnInit();
        },
        error: (err) => {
          console.error('Error al actualizar cliente', err.error);
          this.errorMessage = 'Error al actualizar el perfil.';
        }
      });
    }
  }


  openPhotoUpload(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file && this.cliente) {
        this.clienteService.uploadPhoto(this.cliente.id, file).subscribe({
          next: (res) => {
            if (this.cliente) {
              this.cliente.fotoPath = res.fotoPath;
            }
          },
          error: (err) => console.error('Error al subir foto', err)
        });
      }
    };
    input.click();
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }
}
