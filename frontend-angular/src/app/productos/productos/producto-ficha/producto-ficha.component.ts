import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductoImpl } from '../../models/producto-impl';
import { ProductoService } from '../../service/producto.service';
import { ClienteImpl } from 'src/app/clientes/models/cliente-impl';
import { Cliente } from 'src/app/clientes/models/cliente';

@Component({
  selector: 'app-producto-ficha',
  templateUrl: './producto-ficha.component.html',
  styles: [
  ]
})
export class ProductoFichaComponent implements OnInit {
  @Input() producto: ProductoImpl;
  @Output() productoEliminar = new EventEmitter<ProductoImpl>();
  @Output() productoEditar = new EventEmitter<ProductoImpl>();
  cliente: Cliente = new ClienteImpl();
  nombreProducto: string;
  
  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.nombreProducto = this.producto.nombre;
    console.log(this.nombreProducto);
    this.productoService.getCliente(this.producto).subscribe((response) => this.cliente = this.productoService.mapearCliente(response));
  }
  
  eliminar(): void {
    this.productoEliminar.emit(this.producto);
  }

  editar(): void {
    console.log(this.producto.nombre + "editar()")
    this.productoEditar.emit(this.producto);
  }
}
