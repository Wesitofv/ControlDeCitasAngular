import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Role {
  id: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'https://localhost:7005/api/roles'; // Ajusta esta URL según corresponda

  constructor(private http: HttpClient) {}

  // Obtener todos los roles
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl);
  }

  // Crear un nuevo rol
  createRole(role: Partial<Role>): Observable<Role> {
    return this.http.post<Role>(this.apiUrl, role);
  }

  // Actualizar un rol
  updateRole(id: string, role: Partial<Role>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, role);
  }

  // Eliminar un rol
  deleteRole(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
