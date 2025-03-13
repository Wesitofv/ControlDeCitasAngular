import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from './../../services/cliente.service';

@Component({
  selector: 'app-cliente-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModalModule],
  templateUrl: './cliente-edit-modal.component.html',
  styleUrls: ['./cliente-edit-modal.component.scss']
})
export class ClienteEditModalComponent implements OnInit {
  // Recibimos el cliente a editar
  @Input() cliente!: any; // Puedes definir una interfaz para mayor tipado
  errorMessage: string = '';

  constructor(public activeModal: NgbActiveModal, private clienteService: ClienteService) {}

  ngOnInit(): void {
  }

  updateCliente(): void {
    // Validación básica (puedes agregar más validaciones)
    if (!this.cliente.nombre || !this.cliente.email || !this.cliente.usuarioId) {
      this.errorMessage = 'Nombre, Email y UsuarioID son obligatorios.';
      return;
    }
    // Llama al servicio para actualizar
    this.clienteService.updateCliente(this.cliente.id, this.cliente).subscribe({
      next: () => {
        this.activeModal.close(this.cliente);
      },
      error: (err) => {
        console.error('Error al actualizar cliente', err);
        this.errorMessage = 'Error al actualizar el cliente.';
      }
    });
  }

  cancel(): void {
    this.activeModal.dismiss('cancel');
  }
}


