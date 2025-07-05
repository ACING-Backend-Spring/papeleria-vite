<template>
  <hr class="w-100" />
  <div class="row justify-content-end">
    <button class="btn btn-danger text-white col-2" @click="getProductos()">
      {{ $t('productos.allProducts') }}</button
    >&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-warning text-white col-2" @click="aBuscar()">
      {{ $t('productos.productosEmpresa') }}</button
    >&nbsp;&nbsp;&nbsp;&nbsp;
    <button
      class="btn btn-primary text-white col-2"
      data-bs-toggle="modal"
      data-bs-target="#modal-nuevo-producto"
    >
      {{ $t('productos.nuevoProducto') }}
    </button>
  </div>
  <div class="row justify-content-end mt-2" v-if="buscar">
    <hr />
    <label class="mt-2 col-2"
      ><b>{{ $t('productos.mailEmpresa') }}:</b></label
    >
    <input
      class="col-2"
      type="text"
      name="empresa"
      :placeholder="$t('productos.empresa')"
      v-model="empresa"
    />&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-danger text-white mr-3 ml-3 col-1" @click="buscarPorEmpresa()">
      {{ $t('comun.buscar') }}
    </button>
  </div>
  <hr class="w-100" />
  <h1 v-titulo.xl.blue class="text-center">
    <b>{{ $t('productos.productList') }}</b>
  </h1>
  <hr class="w-100" />
  <div class="container">
    <input
      type=" text"
      :placeholder="$t('productos.filtrar')"
      class="mr-5"
      v-model="search"
      @keyup="filtrarProducto"
    />&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-primary btn-mr-3" @click="elegirLayout(ProductosListLayout)">
      <b>{{ $t('comun.lista') }}</b></button
    >&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn btn-success mr-3" @click="elegirLayout(ProductosCardsLayout)">
      <b>{{ $t('comun.tarjetas') }}</b></button
    >&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('productos.libro') }}:<v-icon
      name="fa-book"
      color="blue"
      scale="2"
    />&nbsp;&nbsp;&nbsp;&nbsp;{{ $t('productos.cuaderno') }}:<v-icon
      name="fa-address-book"
      color="red"
      scale="2"
    />
    <component
      :is="layout"
      :content="productosFiltrados"
      @emiteLayout="actualizarProductoEnLista"
    />
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="modal-nuevo-producto"
    tabindex="-1"
    aria-labelledby="modal-nuevo-producto-Label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-nuevo-producto-Label">
            {{ $t('productos.nuevoProducto') }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="nombre" class="form-label"
                ><b>{{ $t('productos.nombre') }}</b></label
              >
              <input type="text" class="form-control" id="nombre" v-model="nombreProducto" />
            </div>
            <div class="mb-3">
              <label for="tipo" class="form-label"
                ><b>{{ $t('productos.tipo') }}</b></label
              ><br />
              <input type="radio" id="libro" value="Libro" v-model="tipo" />&nbsp;
              <label for="libro">{{ $t('productos.libro') }}</label
              ><a href="#" data-bs-toggle="tooltip" :title="$t('productos.libro')"
                ><v-icon name="fa-book" color="blue" scale="2" /></a
              >&nbsp;&nbsp;
              <input type="radio" id="cuaderno" value="Cuaderno" v-model="tipo" />&nbsp;
              <label for="cuaderno">{{ $t('productos.cuaderno') }}</label
              ><a href="#" data-bs-toggle="tooltip" :title="$t('productos.cuaderno')"
                ><v-icon name="fa-address-book" color="red" scale="2"
              /></a>
            </div>
            <div class="mb-3" v-if="tipo == 'Libro'">
              <label for="autor" class="form-label"
                ><b>{{ $t('productos.autor') }}</b></label
              >
              <input type="text" class="form-control" id="autor" v-model="autor" />
            </div>
            <div class="mb-3" v-if="tipo == 'Cuaderno'">
              <label for="hojas" class="form-label"
                ><b>{{ $t('productos.numHojas') }}</b></label
              >
              <input type="number" class="form-control" id="hojas" v-model="hojas" />
            </div>
            <div class="mb-3">
              <label for="pagado" class="form-label"
                ><b>{{ $t('productos.pagado') }}</b></label
              ><br />
              <input type="radio" id="pagado" value="true" v-model="pagado" />&nbsp;
              <label for="pagado"
                ><a href="#" data-bs-toggle="tooltip" :title="$t('productos.pagado')"
                  ><v-icon name="fa-check" color="green" scale="2" /></a></label
              >&nbsp;&nbsp;
              <input type="radio" id="noPagado" value="false" v-model="pagado" />&nbsp;
              <label for="noPagado"
                ><a href="#" data-bs-toggle="tooltip" :title="$t('productos.noPagado')"
                  ><v-icon name="fa-times" color="red" scale="2" /></a
              ></label>
            </div>
            <div class="mb-3">
              <label for="cliente" class="form-label"
                ><b>{{ $t('clientes.clientes', 1).toUpperCase() }}</b></label
              >
              <select class="form-select" aria-label="cliente" v-model="idCliente">
                <option disabled value="">{{ $t('productos.selectCliente') }}</option>
                <option
                  v-for="cliente in clientes"
                  :key="cliente.idString"
                  :value="cliente.idString"
                >
                  {{ cliente.nombre }}
                </option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button
            type="button"
            @click="crearProducto"
            data-bs-dismiss="modal"
            class="btn btn-primary"
          >
            {{ $t('productos.crearProducto') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineAsyncComponent, ref, onMounted } from 'vue'
import ProductoService from '@/services/ProductoService'
import ClienteService from '@/services/ClienteService'

let nombreProducto = ref('')
let tipo = ref('')
let autor = ref('')
let hojas = ref(0)
let pagado = ref(false)
let empresa = ref('')
let buscar = ref(false)
let idCliente = ref('')
const productoService = new ProductoService()
const clienteService = new ClienteService()
const clientes = clienteService.getClientes()
const productos = productoService.getProductos()
let productosFiltrados = ref([])
productosFiltrados.value = productos.value
const ProductosListLayout = defineAsyncComponent(() => import('@/layouts/ProductosListLayout.vue'))
const ProductosCardsLayout = defineAsyncComponent(
  () => import('@/layouts/ProductosCardsLayout.vue'),
)
const layout = ref(ProductosListLayout)
const search = ref('')

onMounted(async () => {
  await getProductos()
  await getClientes()
})
const crearProducto = async () => {
  if (tipo.value == 'Libro') {
    await productoService.crearLibro(
      nombreProducto.value,
      autor.value,
      pagado.value,
      idCliente.value,
    )
    nombreProducto.value = ''
    autor.value = ''
    pagado.value = false
    idCliente.value = ''
  } else if (tipo.value == 'Cuaderno') {
    await productoService.crearCuaderno(
      nombreProducto.value,
      hojas.value,
      pagado.value,
      idCliente.value,
    )
    nombreProducto.value = ''
    hojas.value = 0
    pagado.value = false
    idCliente.value = ''
  }
  await getProductos()
  await getClientes()
}
const aBuscar = () => {
  buscar.value = !buscar.value
}
const buscarPorEmpresa = async () => {
  await productoService.fetchPorEmpresa(empresa.value)
  filtrarProducto()
}
const getProductos = async () => {
  await productoService.fetchAll()
  productosFiltrados.value = productos.value
  empresa.value = ''
  buscar.value = false
  search.value = ''
}
const elegirLayout = (layoutElegido) => (layout.value = layoutElegido)
const filtrarProducto = () =>
  (productosFiltrados.value = productos.value.filter((producto) =>
    producto.nombre.toLowerCase().includes(search.value.toLowerCase()),
  ))
async function actualizarProductoEnLista() {
  await getProductos()
}
const getClientes = async () => {
  await clienteService.fetchAll()
}
</script>
<style scoped lang="scss"></style>
