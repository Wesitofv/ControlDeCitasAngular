import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CitaService } from './../../../../src/app/services/cita.service';

@Component({
  selector: 'app-cita-create-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModalModule],
  templateUrl: './cita-create-modal.component.html',
  styleUrls: ['./cita-create-modal.component.scss']
})
export class CitaCreateModalComponent {
  nuevoCita = {
    fechaHora: '',  // En formato ISO o compatible con date input
    clienteId: '',
    usuarioId: '',
    email:'',
  };

  errorMessage: string = '';

  constructor(public activeModal: NgbActiveModal, private citaService: CitaService) {}

  closeModal(): void {
    this.activeModal.dismiss('closed');
  }

  cancel(): void {
    this.activeModal.dismiss('cancel');
  }

  createCita(): void {
    if (!this.nuevoCita.fechaHora || !this.nuevoCita.clienteId || !this.nuevoCita.usuarioId) {
      this.errorMessage = 'FechaHora, Cliente ID y Usuario ID son obligatorios.';
      return;
    }

    // Convertir el string de fecha a Date
    const citaToCreate = {
      ...this.nuevoCita,
      fechaHora: new Date(this.nuevoCita.fechaHora)
    };

    this.citaService.createCita(citaToCreate).subscribe({
      next: (cita) => {
        this.activeModal.close(cita);
      },
      error: (err: any) => {
        console.error('Error al crear cita', err);
        this.errorMessage = 'Error al crear la cita.';
      }
    });
  }
}
