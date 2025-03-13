import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CitaService, Cita } from './../../../app/services/cita.service';  // Asegúrate de que esta ruta sea correcta
import { FullCalendarModule } from '@fullcalendar/angular';

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
    events: [] // Se llenará al cargar las citas
  };

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.loadCitas();
  }

  loadCitas(): void {
    this.citaService.getCitas().subscribe({
      next: (citas: Cita[]) => {
        // Mapear las citas a eventos de FullCalendar
        this.calendarOptions.events = citas.map(cita => ({
          id: cita.id.toString(),
          title: `Cita: ${cita.clienteId}`, // Puedes ajustar el título según necesites
          start: cita.fechaHora, // Asegúrate que fechaHora sea una fecha válida o un string ISO
          allDay: false
        }));
      },
      error: (err: any) => {
        console.error('Error al cargar citas', err);
      }
    });
  }
}
