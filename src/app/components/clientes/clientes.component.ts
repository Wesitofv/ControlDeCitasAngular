import { Component, OnInit } from '@angular/core';
import { Cliente, ClienteService } from './../../services/cliente.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteCreateModalComponent } from '../cliente-create-modal/cliente-create-modal.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ClienteEditModalComponent } from '../cliente-edit-modal/cliente-edit-modal.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  errorMessage: string = '';

  constructor(
    private clienteService: ClienteService,
    private modalService: NgbModal,
    private router: Router  // Inyectamos Router para navegar al perfil
  ) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err: any) => {
        console.error('Error al cargar clientes', err);
        this.errorMessage = err.message;
      }
    });
  }

  openCreateModal(): void {
    const modalRef = this.modalService.open(ClienteCreateModalComponent, { centered: true });
    modalRef.result.then(
      () => {
        this.loadClientes();
      },
      (reason: any) => {
        console.log('Modal de creación descartado:', reason);
      }
    );
  }

  openEditModal(cliente: any): void {
    const modalRef = this.modalService.open(ClienteEditModalComponent, { centered: true });
    // Pasa una copia del cliente a editar
    modalRef.componentInstance.cliente = { ...cliente };
    modalRef.result.then(
      (result) => {
        console.log('Modal de edición cerrado con:', result);
        this.loadClientes();
      },
      (reason: any) => {
        console.log('Modal de edición descartado:', reason);
      }
    );
  }

  buscarCumpleanos(mes: number): void {
    this.clienteService.getCumpleanos(mes).subscribe({
      next: (data: Cliente[]) => {
        console.log('Clientes que cumplen años en el mes', mes, data);
      },
      error: (err) => {
        console.error('Error al buscar cumpleañeros', err);
      }
    });
  }

  deleteCliente(id: string): void {
    if (confirm(`¿Estás seguro de eliminar el cliente con ID ${id}?`)) {
      this.clienteService.deleteCliente(id).subscribe({
        next: () => this.loadClientes(),
        error: (err: any) => {
          console.error('Error al eliminar cliente', err);
          this.errorMessage = err.message;
        }
      });
    }
  }

  // Método para navegar a la página de perfil del cliente
  viewProfile(id: string): void {
    this.router.navigate(['/clientes', id]);
  }

  // Método que retorna el ícono correspondiente según la fecha de cumpleaños
  getCumpleIcon(fechaCumple: string): string {
    if (!fechaCumple) {
      return '';
    }
    const cumple = new Date(fechaCumple);
    const hoy = new Date();
    // Ajustamos el año para comparar solo día y mes
    cumple.setFullYear(hoy.getFullYear());
    if (cumple.getMonth() !== hoy.getMonth()) {
      return '';
    }
    if (cumple.getDate() === hoy.getDate()) {
      return 'fas fa-birthday-cake'; // Pastel (cumpleaños hoy)
    } else if (cumple.getDate() > hoy.getDate()) {
      return 'fas fa-clock'; // Reloj (cumpleaños aún no ha pasado)
    } else {
      return 'fas fa-sign-out-alt'; // Despedida (cumpleaños ya pasó)
    }
  }
}
