import { Cliente } from "src/app/clientes/models/cliente";

export interface Producto {

  id: string;
  nombre: string;
  pagado: boolean;
  autor?: string;
  hojas?: number | string;
  cliente: Cliente;
  url: string;
  tipo: string;

}
