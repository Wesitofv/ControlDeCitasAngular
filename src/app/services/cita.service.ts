import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cita {
  id: string;
  fechaHora: Date;
  clienteId: string;
  usuarioId: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'https://localhost:7005/api/citas'; // Ajusta esta URL según tu API

  constructor(private http: HttpClient) {}

  // Obtener todas las citas
  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  // Obtener una cita por ID (opcional)
  getCitaById(id: string): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva cita
  createCita(cita: Partial<Cita>): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  // Actualizar una cita
  updateCita(id: string, cita: Partial<Cita>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cita);
  }

  // Eliminar una cita (borrado lógico)
  deleteCita(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

