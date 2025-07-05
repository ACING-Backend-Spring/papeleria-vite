import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { ClienteImpl } from '../models/cliente-impl';
import { Producto } from 'src/app/productos/models/producto';
import { ProductoImpl } from 'src/app/productos/models/producto-impl';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  private host: string = environment.urlHost;
  private urlEndPoint: string = `${this.host}clientes`;

  constructor(
    private http: HttpClient) { }

  getProductosIdCliente(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${id}/productos?page=0&size=1000`);
  }
  getProductosCliente(cliente): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${cliente.id}/productos?page=0&size=1000`);
  }

  extraerProductos(respuestaApi: any): Producto[] {
    const productos: Producto[] = [];
    if (respuestaApi._embedded.libros) {
      respuestaApi._embedded.libros.forEach(p => {
        productos.push(this.mapearProducto(p));
      });
    }
    if (respuestaApi._embedded.cuadernos) {
      respuestaApi._embedded.cuadernos.forEach(p => {
        productos.push(this.mapearProducto(p));
      });
    }
    return productos;
  }

  mapearProducto(productoApi: any): ProductoImpl {
    const producto = new ProductoImpl();
    producto.tipo = productoApi.tipo;
    producto.nombre = productoApi.nombre;
    producto.autor = productoApi.autor ? productoApi.autor : '';
    producto.pagado = productoApi.pagado;
    producto.hojas = productoApi.hojas ? productoApi.hojas : '';
    producto.url = productoApi._links.self.href;
    producto.id = producto.getId(producto.url);
    producto.tipo = productoApi.autor ? 'Libro' : 'Cuaderno';
    return producto;
  }
  getClientes(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  getClientesDeEmpresa(empresa: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/search/correo?txt=${empresa}&page=0&size=1000`);
  }

  extraerClientes(respuestaApi: any): Cliente[] {
    const clientes: Cliente[] = [];
    respuestaApi._embedded.clientes.forEach(c => {
      clientes.push(this.mapearCliente(c));

    });
    return clientes;
  }

  mapearCliente(clienteApi: any): ClienteImpl {
    const cliente = new ClienteImpl();
    cliente.nombre = clienteApi.nombre;
    cliente.correo = clienteApi.correo;
    cliente.url = clienteApi._links.self.href;
    cliente.id = cliente.getId(cliente.url);

    return cliente;
  }

  create(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.urlEndPoint}`, cliente).pipe(
      catchError((e) => {
        if (e.status === 400) {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  delete(cliente): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${cliente.id}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente)
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }

  getCliente(id): Observable<any> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
