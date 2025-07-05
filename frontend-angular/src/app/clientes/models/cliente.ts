import { Producto } from "src/app/productos/models/producto";

export interface Cliente {

  id: string;
  nombre: string;
  correo: string;
  productos: Producto[];
  url: string;

}
