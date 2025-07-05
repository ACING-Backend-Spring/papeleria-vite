import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Producto } from 'src/app/productos/models/producto';
import { ProductoImpl } from 'src/app/productos/models/producto-impl';
import { Cliente } from 'src/app/clientes/models/cliente';
import { ClienteImpl } from 'src/app/clientes/models/cliente-impl';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  private host: string = environment.urlHost;
  private urlEndPoint: string = `${this.host}productos`;

  constructor(
    private http: HttpClient) { }

  getProductosDeCliente(cliente: Cliente): Observable<any> {
    return this.http.get<any>(`${this.host}clientes/${cliente.id}/productos?page=0&size=1000`);
  }

  getProductosIdCliente(id: string): Observable<any> {
    return this.http.get<any>(`${this.host}clientes/${id}/productos?page=0&size=1000`);
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
  getProductos(): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}?page=0&size=1000`);
  }

  getProductosDeEmpresa(empresa: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/search/clientes-por-correo?tipo-correo=${empresa}&page=0&size=1000`);
  }

  createLibro(producto: Producto): Observable<any> {
    return this.http.post(`${this.host}libros`, producto).pipe(
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

  createCuaderno(producto: Producto): Observable<any> {
    return this.http.post(`${this.host}cuadernos`, producto).pipe(
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

  borrarLibro(producto): Observable<Producto> {
    return this.http.delete<Producto>(`${this.host}libros/${producto.id}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }

  borrarCuaderno(producto): Observable<Producto> {
    return this.http.delete<Producto>(`${this.host}cuadernos/${producto.id}`)
      .pipe(
        catchError((e) => {
          if (e.status === 405) {
            console.error('El metodo está bien hecho');
          }
          return throwError(e);
        })
      );
  }


  getProducto(id): Observable<any> {
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getClientes(): Observable<any> {
    return this.http.get<any>(`${this.host}clientes?page=0&size=1000`);//con lo ultimo le digo que me muestre 1000 clientes. sino saldria solo la primera pagina
  }




  update(producto: Producto): Observable<any> {
    console.log(producto.nombre + "updateservice()")

    return this.http
      .put<any>(`${this.urlEndPoint}/${producto.id}`, producto)
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

  extraerClientes(respuestaApi: any): Cliente[] {
    const clientes: Cliente[] = [];
    respuestaApi._embedded.clientes.forEach(c => {
      clientes.push(this.mapearCliente(c));
    });
    return clientes;
  }

  mapearCliente(clienteApi: any): Cliente {
    const cliente = new ClienteImpl();
    cliente.nombre = clienteApi.nombre;
    cliente.correo = clienteApi.correo;
    cliente.url = clienteApi._links.self.href;
    cliente.id = cliente.getId(cliente.url);

    return cliente;
  }
  getCliente(producto: Producto): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${producto.id}/cliente`);
  }

  getClienteId(id): Observable<any> {
    return this.http.get<Cliente>(`${this.host}clientes/${id}`).pipe(
      catchError((e) => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
