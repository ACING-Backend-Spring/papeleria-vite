import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import useUtilsStore from '@/stores/utils'
import i18n from '@/plugins/i18n'
import { toastExito, toTitleCase } from '@/utils'

class ProductoService {
  productos
  producto
  cliente
  auth
  utils

  constructor() {
    this.productos = ref([])
    this.auth = useAuthStore()
    this.utils = useUtilsStore()
    this.cliente = ref()
  }
  getProductos() {
    return this.productos
  }

  getCliente() {
    return this.cliente
  }

  async fetchAll() {
    try {
      let libros
      let cuadernos
      const urlProductos = `${this.utils.urlApi}/productos?size=1000`
      const response = await this.utils.fetchConToken(urlProductos, 'GET', null)
      const json = await response.json()
      json._embedded.libros ? (libros = await json._embedded.libros) : (libros = [])
      json._embedded.cuadernos ? (cuadernos = await json._embedded.cuadernos) : (cuadernos = [])
      this.productos.value = libros.concat(cuadernos)
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async getProductosDeCliente(id) {
    try {
      let libros
      let cuadernos
      const urlProductos = `${this.utils.urlApi}/clientes/${id}/productos?size=1000`
      const response = await this.utils.fetchConToken(urlProductos, 'GET', null)
      const json = await response.json()
      json._embedded.libros ? (libros = await json._embedded.libros) : (libros = [])
      json._embedded.cuadernos ? (cuadernos = await json._embedded.cuadernos) : (cuadernos = [])
      this.productos.value = libros.concat(cuadernos)
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async getClienteDeProducto(id) {
    try {
      const urlCliente = `${this.utils.urlApi}/productos/${id}/cliente`
      const response = await this.utils.fetchConToken(urlCliente, 'GET', null)
      const json = await response.json()
      this.cliente.value = await json
      return this.cliente.value.nombre
    } catch (error) {
      console.log(error)
    }
  }
  async fetchPorEmpresa(empresa) {
    try {
      let libros
      let cuadernos
      const urlProductos = `${this.utils.urlApi}/productos/search/clientes-por-correo?empresa=${empresa}&size=1000`
      const response = await this.utils.fetchConToken(urlProductos, 'GET', null)
      const json = await response.json()
      json._embedded.libros ? (libros = await json._embedded.libros) : (libros = [])
      json._embedded.cuadernos ? (cuadernos = await json._embedded.cuadernos) : (cuadernos = [])
      this.productos.value = libros.concat(cuadernos)
      return response.status == 200 ? true : false
    } catch (error) {
      console.log(error)
    }
  }
  async crearLibro(nombreProducto, autor, pagado, idCliente) {
    try {
      const urlLibros = `${this.utils.urlApi}/libros`
      const response = await this.utils.fetchConToken(urlLibros, 'POST', {
        nombre: nombreProducto.toUpperCase(),
        autor: toTitleCase(autor),
        pagado: pagado,
        cliente: `${this.utils.urlApi}/clientes/${idCliente}`,
      })
      if (response.status == 201) {
        toastExito(i18n.global.t('productos.libroCreado', { libro: nombreProducto.toUpperCase() }))
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async crearCuaderno(nombreProducto, hojas, pagado, idCliente) {
    try {
      const urlCuadernos = `${this.utils.urlApi}/cuadernos?size=1000`
      const response = await this.utils.fetchConToken(urlCuadernos, 'POST', {
        nombre: nombreProducto.toUpperCase(),
        hojas: hojas,
        pagado: pagado,
        cliente: `${this.utils.urlApi}/clientes/${idCliente}`,
      })
      if (response.status == 201) {
        toastExito(
          i18n.global.t('productos.cuadernoCreado', { cuaderno: nombreProducto.toUpperCase() }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async editarLibro(nombreProducto, autor, pagado, idProducto) {
    try {
      const urlLibro = `${this.utils.urlApi}/libros/${idProducto}`
      const response = await this.utils.fetchConToken(urlLibro, 'PATCH', {
        nombre: nombreProducto.toUpperCase(),
        autor: toTitleCase(autor),
        pagado: pagado,
      })
      if (response.status == 200) {
        toastExito(i18n.global.t('productos.libroEditado', { libro: nombreProducto.toUpperCase() }))
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async editarCuaderno(nombreProducto, hojas, pagado, idProducto) {
    try {
      const urlCuaderno = `${this.utils.urlApi}/cuadernos/${idProducto}`
      const response = await this.utils.fetchConToken(urlCuaderno, 'PATCH', {
        nombre: nombreProducto.toUpperCase(),
        hojas: hojas,
        pagado: pagado,
      })
      if (response.status == 200) {
        toastExito(
          i18n.global.t('productos.cuadernoEditado', { cuaderno: nombreProducto.toUpperCase() }),
        )
        return true
      } else return false
    } catch (error) {
      console.log(error)
    }
  }
  async deleteProducto(idProducto) {
    try {
      const urlProducto = `${this.utils.urlApi}/productos/${idProducto}`
      const response = await this.utils.fetchConToken(urlProducto, 'DELETE', null)
      const json = await response.json()
      this.producto.value = await json
      if (response.status == 200) {
        toastExito(i18n.global.t('productos.productoBorrado', { producto: toTitleCase(this.producto.value.nombre) }))
        return true
      } else return false      } catch (error) {
      console.log(error)
    }
  }
}

export default ProductoService
