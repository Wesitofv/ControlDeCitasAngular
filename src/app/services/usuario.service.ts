import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  password: string;
  confirmado: boolean;
  rolId: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://localhost:7005/api/usuarios'; // Asegúrate de que esta URL es correcta

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  createUsuario(usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  updateUsuario(id: string, usuario: Partial<Usuario>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuario);
  }

  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Otros métodos, por ejemplo: createUsuario, updateUsuario, deleteUsuario, etc.
}
