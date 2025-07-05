import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../models/cliente';
import { ClienteImpl } from '../models/cliente-impl';
import { ClienteService } from '../service/cliente.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteVerDatos: Cliente;
  buscar: boolean = false;
  empresa: string = "";

  constructor(
    private clienteService: ClienteService,
    private router: Router) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe((response) => this.clientes = this.clienteService.extraerClientes(response));
  }

  verDatos(cliente: Cliente): void {
    this.clienteVerDatos = cliente;
  }

  onClienteEliminar(cliente: ClienteImpl): void {
    this.clienteService.delete(cliente).subscribe(response => {
      console.log(`He borrado a ${cliente.nombre}`);
      this.router.navigate(['/clientes']);
    });
  }

  onClienteEditar(cliente: ClienteImpl): void {
    this.clienteService.update(cliente).subscribe(response => {
      console.log(`He actualizado a ${cliente.nombre}`);
      this.router.navigate(['/clientes']);
    });
  }

  mostrarBuscar() {
    this.buscar = !this.buscar;
  }
  clientesPorEmpresa() {
    console.log(this.empresa);
    this.clienteService.getClientesDeEmpresa(this.empresa).subscribe((response) => this.clientes = this.clienteService.extraerClientes(response));
  }
}
