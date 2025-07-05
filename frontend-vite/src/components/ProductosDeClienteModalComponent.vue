<template>
  <!-- Llamada al modal-->
  <button class="btn btn-dark" :data-bs-target="'#' + idModal" data-bs-toggle="modal">
    <b>{{ toTitleCase($t('productos.productos', 2)) }}</b>
  </button>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="idModal"
    tabindex="-1"
    aria-labelledby="modal-editar-cliente-Label"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-cliente-Label">
            <b>{{ $t('clientes.productosDeCliente') }}: </b
            ><span class="nombreCliente"> {{ props.nombre }}</span>
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h3 v-if="!hayProductos" class="mt-3 sinProductos">{{ $t('clientes.noProductos') }}</h3>
          <hr />
          <div class="text-center" v-if="hayProductos">
            <div
              v-for="(producto, index) in productosCliente"
              :key="index"
              style="width: 50%; display: inline-block; border: solid"
            >
              <div class="card shadow-sm h-100">
                <img class="card-img-top" alt="" />
                <div class="card-body">
                  <h4 class="card-title text-center">
                    <b>{{ producto.nombre }}</b>
                  </h4>
                  <p class="card-text">
                    <span class="mr-2"
                      ><b>{{ $t('productos.tipo') }}:</b>&nbsp;</span
                    >
                    <span v-if="producto.tipo == 'Libro'"
                      ><a href="#" data-bs-toggle="tooltip" :title="$t('productos.libro')"
                        ><v-icon name="fa-book" color="blue" scale="2" /></a
                    ></span>
                    <span v-if="producto.tipo == 'Cuaderno'"
                      ><a href="#" data-bs-toggle="tooltip" :title="$t('productos.cuaderno')"
                        ><v-icon name="fa-address-book" color="red" scale="2" /></a
                    ></span>
                  </p>
                  <p class="card-text" v-if="producto.tipo == 'Libro'">
                    <span class="mr-2"
                      ><b>{{ $t('productos.autor') }}:</b>&nbsp;</span
                    >
                    <span>{{ producto.autor }}</span>
                  </p>
                  <p class="card-text" v-if="producto.tipo == 'Cuaderno'">
                    <span class="mr-2"
                      ><b>{{ $t('productos.numHojas') }}:</b>&nbsp;</span
                    >
                    <span>{{ producto.hojas }}</span>
                  </p>
                  <p class="card-text">
                    <span class="mr-2"
                      ><b>{{ $t('productos.pagado') }}:</b>&nbsp;</span
                    >
                    <span v-if="producto.pagado"
                      ><a href="#" data-bs-toggle="tooltip" :title="$t('productos.pagado')"
                        ><v-icon name="fa-check" color="green" scale="2" /></a
                    ></span>
                    <span v-else
                      ><a href="#" data-bs-toggle="tooltip" :title="$t('productos.noPagado')"
                        ><v-icon name="fa-times" color="red" scale="2" /></a
                    ></span>
                  </p>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ProductoService from '@/services/ProductoService'
import { toTitleCase } from '@/utils'
import { onMounted, ref } from 'vue'

const props = defineProps(['nombre', 'idCliente'])
let idModal = 'modal-cliente-productos' + props.idCliente
let productosCliente = ref([])
let hayProductos = ref(false)
onMounted(async () => {
  const service = new ProductoService()
  let productos = service.getProductos()
  await service.getProductosDeCliente(props.idCliente)
  productosCliente.value = productos.value
  hayProductos.value = productos.value.length != 0
})
</script>
<style scoped lang="scss">
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.sinProductos {
  color: red;
}

.nombreCliente {
  color: blue;
}
</style>
