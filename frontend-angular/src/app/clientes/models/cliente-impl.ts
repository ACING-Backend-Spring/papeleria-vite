import { Cliente } from "./cliente";
import { Producto } from "src/app/productos/models/producto";

export class ClienteImpl implements Cliente {

  id: string;
  nombre: string;
  correo: string;
  productos: Producto[];
  url: string;

  constructor(){}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}
