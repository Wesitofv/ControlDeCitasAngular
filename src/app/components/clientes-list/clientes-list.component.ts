import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente  } from './../../services/cliente.service';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit {
  clientes: Cliente[] = [];
  errorMessage: string = '';

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;
      },
      error: (err: any) => {
        console.error('Error al cargar clientes', err);
        this.errorMessage = err.message;
      }
    });
  }
}
