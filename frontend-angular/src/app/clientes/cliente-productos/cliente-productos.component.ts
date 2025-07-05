import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../service/cliente.service';
import { Producto } from 'src/app/productos/models/producto';

@Component({
  selector: 'app-cliente-productos',
  templateUrl: './cliente-productos.component.html',
  styles: []
})
export class ClienteProductosComponent implements OnInit {
  productos: Producto[];
  constructor(
    private activateRoute: ActivatedRoute,
    private clienteService: ClienteService) { }
 
    ngOnInit(): void {
      this.clienteService.getProductosIdCliente(this.activateRoute.snapshot.params['id']).subscribe((response) => this.productos = this.clienteService.extraerProductos(response));
    console.log(this.productos);
    }
}
