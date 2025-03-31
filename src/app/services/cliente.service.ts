import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id: string;
  nombre: string;
  telefono: string;
  apellidos?: string;
  rol?: string;
  email: string;
  activo: boolean;
  usuarioId: string;
  fechaCumple: string;
  biografia?: string;
  fotoPath?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'https://localhost:7005/api/clientes'; // url de mi api

  constructor(private http: HttpClient) {}

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getClienteById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // createCliente(cliente: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, cliente);
  // }
  createCliente(cliente: any): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }


  // updateCliente(id: string, cliente: any): Observable<any> { //locambie a sting
  //   return this.http.put<any>(`${this.apiUrl}/${id}`, cliente);
  // }
  updateCliente(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }


  deleteCliente(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`); }

getCumpleanos(mes: number): Observable<Cliente[]> {
  return this.http.get<Cliente[]>(`${this.apiUrl}/cumpleanos?mes=${mes}`);
}

uploadPhoto(id: string, file: File): Observable<{ fotoPath: string }> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post<{ fotoPath: string }>(`${this.apiUrl}/upload-photo/${id}`, formData);
}

}

