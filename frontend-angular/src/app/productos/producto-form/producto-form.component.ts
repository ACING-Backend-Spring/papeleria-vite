import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoImpl } from '../models/producto-impl';
import { ProductoService } from '../service/producto.service';
import { Cliente } from 'src/app/clientes/models/cliente';


@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styles: [
  ]
})
export class ProductoFormComponent implements OnInit {
  producto: ProductoImpl = new ProductoImpl();
  clientes: Cliente[];

  constructor(private productoService: ProductoService, 
    private router: Router) { }

  ngOnInit(): void {
    this.producto.tipo = 'Libro';
    this.productoService.getClientes().subscribe((response) => this.clientes = this.productoService.extraerClientes(response));
  }

  crearProducto(): void {
    if (this.producto.tipo == 'Libro') {
      this.productoService.createLibro(this.producto).subscribe((response) => {
        console.log(`He creado un ${this.producto.tipo}`);
        this.router.navigate(['/productos']);
      });
    } else if (this.producto.tipo == 'Cuaderno') {
      this.productoService.createCuaderno(this.producto).subscribe((response) => {
        console.log(`He creado un ${this.producto.tipo}`);
        this.router.navigate(['/productos']);
      });
    }
  }
}
