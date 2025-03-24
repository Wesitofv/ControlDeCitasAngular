import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CitaService, Cita } from './../../../app/services/cita.service';  // Asegúrate de que esta ruta sea correcta
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitaCreateModalComponent } from '../cita-create-modal/cita-create-modal.component';
import { CitaDetailModalComponent } from '../cita-detail-modal/cita-detail-modal.component';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    events: [],
    eventClick: this.handleEventClick.bind(this)
  };

  constructor(
    private citaService: CitaService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadCitas();
  }

  loadCitas(): void {
    this.citaService.getCitas().subscribe({
      next: (citas: Cita[]) => {
        // Mapeamos las citas a eventos de FullCalendar
        this.calendarOptions.events = citas.map(cita => {
          return {
            id: cita.id,
            title: cita.nombreCliente,
            start: cita.fechaHora,
            extendedProps: {
              email: cita.emailCliente,
              createdDate: cita.createdDate
            }
          };
        });
      },
      error: (err: any) => {
        console.error('Error al cargar citas', err);
      }
    });
  }

  openCreateModal(): void {
    const modalRef = this.modalService.open(CitaCreateModalComponent, { centered: true });
    modalRef.result.then(
      () => {
        this.loadCitas();
      },
      (reason: any) => {
        console.log('Modal de creación descartado:', reason);
      }
    );
  }

  handleEventClick(clickInfo: any): void {
    // Abrimos el modal con los detalles de la cita
    const modalRef = this.modalService.open(CitaDetailModalComponent, { centered: true });
    modalRef.componentInstance.eventData = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      email: clickInfo.event.extendedProps.email,
      createdDate: clickInfo.event.extendedProps.createdDate
    };
  }
}
