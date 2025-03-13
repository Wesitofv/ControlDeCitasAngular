import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'https://localhost:7005/api/clientes'; // url de mi api

  constructor(private http: HttpClient) {}

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getClienteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente);
  }

  updateCliente(id: number, cliente: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

export interface Cliente {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  activo: boolean;
  usuarioId: string;
}
