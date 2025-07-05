import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { ProductoFichaComponent } from './productos/producto-ficha/producto-ficha.component';
import { ProductosComponent } from './productos/productos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';





@NgModule({
  declarations: [ProductosComponent, ProductoFichaComponent, ProductoFormComponent, ProductoComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class ProductosModule { }
