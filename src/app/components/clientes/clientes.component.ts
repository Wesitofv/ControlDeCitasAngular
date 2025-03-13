import { Component, OnInit } from '@angular/core';
import { ClienteService } from './../../services/cliente.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteCreateModalComponent } from '../cliente-create-modal/cliente-create-modal.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClienteEditModalComponent } from '../cliente-edit-modal/cliente-edit-modal.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  errorMessage: string = '';

  constructor(
    private clienteService: ClienteService,
    private modalService: NgbModal
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
      (result) => {
        this.loadClientes();
      },
      (reason) => {
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
      (reason) => {
        console.log('Modal de edición descartado:', reason);
      }
    );
  }


  deleteCliente(cliente: any): void {
    if (window.confirm(`¿Estás seguro de eliminar a ${cliente.nombre}?`)) {
      this.clienteService.deleteCliente(cliente.id).subscribe({
        next: () => {
          console.log('Cliente eliminado');
          this.loadClientes();
        },
        error: (err: any) => {
          console.error('Error al eliminar cliente', err);
          this.errorMessage = err.message;
        }
      });
    }
  }
}

