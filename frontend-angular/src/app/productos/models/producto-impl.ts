import { Cliente } from "src/app/clientes/models/cliente";
import { Producto } from "./producto";


export class ProductoImpl implements Producto {

  id: string;
  nombre: string;
  pagado: boolean;
  autor?: string;
  hojas?: number | string;
  cliente: Cliente;
  url: string;
  tipo: string;

  constructor(){}
  getId(url: string): string {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
}
