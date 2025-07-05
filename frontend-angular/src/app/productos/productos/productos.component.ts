import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBook, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { ProductoImpl } from '../models/producto-impl';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'
  ]
})
export class ProductosComponent implements OnInit {
  faBook = faBook;
  faAddressBook = faAddressBook;
  productos: Producto[] = [];
  productoVerDatos: Producto;
  buscar: boolean = false;
  empresa: string = "";

  constructor(
    private productoService: ProductoService,
    private router: Router) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((response) => {
      this.productos = this.productoService.extraerProductos(response);
      this.productos.forEach(p => {
        this.productoService.getCliente(p).subscribe(response => p.cliente = this.productoService.mapearCliente(response))
      })
    });

  }
  actualizarListado(): void {
    this.productoService.getProductos().subscribe((response) => {
      this.productos = this.productoService.extraerProductos(response);

    });

  }

  verDatos(producto: Producto): void {
    this.productoVerDatos = producto;
  }


  onProductoEliminar(producto: ProductoImpl): void {
    if (producto.tipo === 'Libro') {
      this.productoService.borrarLibro(producto).subscribe(response => {
        console.log(`He borrado un ${producto.tipo}`);
        this.router.navigate(['/productos']);
      });
    }
    else if (producto.tipo === 'Cuaderno') {
      this.productoService.borrarCuaderno(producto).subscribe(response => {
        console.log(`He borrado un ${producto.tipo}`);
        this.router.navigate(['/productos']);
      });
    }
  }

  onProductoEditar(producto: ProductoImpl): void {
    console.log(producto.nombre + "onProductoEditar()")

    this.productoService.update(producto).subscribe(response => {
      console.log(`He actualizado un ${producto.tipo}`);
      console.log(producto.nombre + "update()")

      this.router.navigate(['/productos']);
    });
  }

  mostrarBuscar() {
    this.buscar = !this.buscar;
  }
  productosPorEmpresa() {
    console.log(this.empresa);
    this.productoService.getProductosDeEmpresa(this.empresa).subscribe((response) => this.productos = this.productoService.extraerProductos(response));
  }
}
