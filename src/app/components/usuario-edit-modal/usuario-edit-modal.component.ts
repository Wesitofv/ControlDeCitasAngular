import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-usuario-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModalModule],
  templateUrl: './usuario-edit-modal.component.html',
  styleUrls: ['./usuario-edit-modal.component.scss']
})
export class UsuarioEditModalComponent implements OnInit {
  @Input() usuario!: any;  // Recibe el usuario a editar
  errorMessage: string = '';

  constructor(public activeModal: NgbActiveModal, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    // Opcional: crear una copia para evitar mutar el objeto original
    // this.usuario = { ...this.usuario };
  }

  updateUsuario(): void {
    if (!this.usuario.nombre || !this.usuario.email || !this.usuario.rolId) {
      this.errorMessage = 'Nombre, Email y Rol ID son obligatorios.';
      return;
    }
    this.usuarioService.updateUsuario(this.usuario.id, this.usuario).subscribe({
      next: () => {
        this.activeModal.close(this.usuario);
      },
      error: (err: any) => {
        console.error('Error al actualizar usuario', err);
        this.errorMessage = 'Error al actualizar el usuario.';
      }
    });
  }

  cancel(): void {
    this.activeModal.dismiss('cancel');
  }
}
