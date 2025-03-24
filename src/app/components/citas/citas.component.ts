import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaService, Cita } from './../../../../src/app/services/cita.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitaCreateModalComponent } from '../cita-create-modal/cita-create-modal.component';
import { CitaEditModalComponent } from '../cita-edit-modal/cita-edit-modal.component';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {
  citas: Cita[] = [];
  errorMessage: string = '';

  constructor(
    private citaService: CitaService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadCitas();
  }

  loadCitas(): void {
    this.citaService.getCitas().subscribe({
      next: (data: Cita[]) => this.citas = data,
      error: (err: any) => {
        console.error('Error al cargar citas', err);
        this.errorMessage = err.message;
      }
    });
  }


  openCreateModal(): void {
    const modalRef = this.modalService.open(CitaCreateModalComponent, { centered: true });
    modalRef.result.then(
      (result) => this.loadCitas(),
      (reason) => console.log('Modal de creación descartado:', reason)
    );
  }

  openEditModal(cita: Cita): void {
    const modalRef = this.modalService.open(CitaEditModalComponent, { centered: true });
    modalRef.componentInstance.cita = { ...cita };
    modalRef.result.then(
      (result) => this.loadCitas(),
      (reason) => console.log('Modal de edición descartado:', reason)
    );
  }

  deleteCita(cita: Cita): void {
    if (window.confirm(`¿Estás seguro de eliminar la cita con ID ${cita.id}?`)) {
      this.citaService.deleteCita(cita.id).subscribe({
        next: () => this.loadCitas(),
        error: (err: any) => {
          console.error('Error al eliminar cita', err);
          this.errorMessage = err.message;
        }
      });
    }
  }
}
