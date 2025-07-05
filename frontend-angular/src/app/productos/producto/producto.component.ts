import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from '../models/producto';
import { faBook, faAddressBook, faTimes, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Cliente } from 'src/app/clientes/models/cliente';
import { ProductoService } from '../service/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [
  ]
})
export class ProductoComponent implements OnInit {
  @Input() producto: Producto;
  @Output() productoSeleccionado = new EventEmitter<Producto>();
  cliente: Cliente;
  faBook = faBook;
  faAddressBook = faAddressBook;
  faTimes =faTimes;
  faCheck = faCheck;
  faEdit = faEdit;

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.getCliente(this.producto).subscribe((response) => this.cliente = this.productoService.mapearCliente(response));
  }

}
