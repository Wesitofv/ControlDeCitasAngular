import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cita-detail-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Detalle de la Cita</h4>
      <button type="button" class="btn-close" aria-label="Cerrar" (click)="activeModal.dismiss()"></button>
    </div>
    <div class="modal-body">
      <p><strong>ID:</strong> {{ eventData.id }}</p>
      <p><strong>Nombre:</strong> {{ eventData.title }}</p>
      <p><strong>Fecha y Hora:</strong> {{ eventData.start | date:'dd/MM/yyyy HH:mm' }}</p>
      <p><strong>Email:</strong> {{ eventData.email }}</p>
      <p><strong>Fecha de Registro:</strong> {{ eventData.createdDate | date:'dd/MM/yyyy' }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close()">Cerrar</button>
    </div>
  `,
  styles: [`
    .modal-header { background-color: #333; color: #fff; }
    .modal-body { font-size: 16px; }
  `]
})
export class CitaDetailModalComponent {
  @Input() eventData: any;
  constructor(public activeModal: NgbActiveModal) {}
}
