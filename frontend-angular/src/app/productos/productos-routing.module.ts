import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';


const routes: Routes = [
  {
    path: '',
    component: ProductosComponent
  },
  {
    path: 'formulario',
    component: ProductoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
