import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CitaService } from './../../../../src/app/services/cita.service';

@Component({
  selector: 'app-cita-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModalModule],
  templateUrl: './cita-edit-modal.component.html',
  styleUrls: ['./cita-edit-modal.component.scss']
})
export class CitaEditModalComponent implements OnInit {
  @Input() cita!: any; // Puedes tiparlo con la interfaz Cita si lo deseas
  errorMessage: string = '';

  constructor(public activeModal: NgbActiveModal, private citaService: CitaService) {}

  ngOnInit(): void {
    // Puedes hacer una copia del objeto cita si no deseas modificar el original
  }

  updateCita(): void {
    if (!this.cita.fechaHora || !this.cita.clienteId || !this.cita.usuarioId) {
      this.errorMessage = 'FechaHora, Cliente ID y Usuario ID son obligatorios.';
      return;
    }
    this.citaService.updateCita(this.cita.id, this.cita).subscribe({
      next: () => {
        this.activeModal.close(this.cita);
      },
      error: (err: any) => {
        console.error('Error al actualizar cita', err);
        this.errorMessage = 'Error al actualizar la cita.';
      }
    });
  }

  cancel(): void {
    this.activeModal.dismiss('cancel');
  }
}
