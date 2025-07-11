<template>
  <!-- Llamada al modal -->
  <a data-bs-toggle="modal" :data-bs-target="'#' + idModal"
    ><v-icon name="fa-edit" scale="1.5" @click="alertar"
  /></a>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="idModal"
    tabindex="-1"
    aria-labelledby="modal-editar-producto-Label"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-editar-producto-Label">
            {{ $t('productos.editarProducto') }}{{ props.idProducto }}
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
                ><b>{{ $t('productos.nombre') }}:</b></label
              >
              <input type="text" class="form-control" id="nombre" v-model="nombreProducto" />
            </div>
            <div class="mb-3">
              <label for="tipo" class="form-label" v-if="tipo == 'Libro'"
                ><b>{{ $t('productos.tipo') }}:</b>&nbsp;<a
                  href="#"
                  data-bs-toggle="tooltip"
                  :title="$t('productos.libro')"
                  ><v-icon name="fa-book" color="blue" scale="2" /></a></label
              ><br />
              <label for="tipo" class="form-label" v-if="tipo == 'Cuaderno'"
                ><b>{{ $t('productos.tipo') }}:</b>&nbsp;<a
                  href="#"
                  data-bs-toggle="tooltip"
                  :title="$t('productos.cuaderno')"
                  ><v-icon name="fa-address-book" color="red" scale="2" /></a></label
              ><br />
            </div>
            <div class="mb-3" v-if="tipo == 'Libro'">
              <label for="autor" class="form-label"
                ><b>{{ $t('productos.autor') }}:</b></label
              >
              <input type="text" class="form-control" id="autor" v-model="autor" />
            </div>
            <div class="mb-3" v-if="tipo == 'Cuaderno'">
              <label for="hojas" class="form-label"
                ><b>{{ $t('productos.numHojas') }}:</b></label
              >
              <input type="number" class="form-control" id="hojas" v-model="hojas" />
            </div>
            <div class="mb-3">
              <label for="pagado" class="form-label"
                ><b>{{ $t('productos.pagado') }}:</b></label
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
              <label for="clienteLabel" class="form-label"
                ><b>{{ toTitleCase($t('clientes.clientes', 1)) }}:</b></label
              ><br />
              <label for="cliente" class="form-label"> {{ cliente }} </label>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <!-- Llamada al modal para eliminar-->
          <button
            class="btn btn-danger"
            :data-bs-target="'#' + idModalEliminar"
            data-bs-toggle="modal"
          >
            {{ $t('productos.borrarProducto') }}
          </button>
          <button
            type="button"
            @click="editarProducto"
            data-bs-dismiss="modal"
            class="btn btn-success"
          >
            {{ $t('productos.guardarProducto') }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal para eliminar-->
  <div
    class="modal fade"
    :id="idModalEliminar"
    aria-hidden="true"
    aria-labelledby="confirmaEliminar-Label"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="confirmaEliminar-Label">
            {{ $t('productos.eliminarProducto') }}{{ idProducto }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">{{ $t('productos.preguntarEliminar') }}{{ nombreProducto }}?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ $t('comun.cerrar') }}
          </button>
          <button
            type="button"
            @click="borrarProducto"
            data-bs-dismiss="modal"
            class="btn btn-danger"
          >
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
import { ref } from 'vue'
const props = defineProps(['nombre', 'tipo', 'idProducto', 'autor', 'hojas', 'pagado'])
const emits = defineEmits(['emiteModal'])
let nombreProducto = ref(props.nombre)
let tipo = ref(props.tipo)
let idProducto = ref(props.idProducto)
let autor = ref(props.autor)
let hojas = ref(props.hojas)
let pagado = ref(props.pagado)
const service = new ProductoService()
let cliente = ref('')
let idModal = 'modal-producto-' + props.idProducto
let idModalEliminar = 'modal-producto-eliminar' + props.idProducto

const alertar = async () => {
  cliente.value = await service.getClienteDeProducto(idProducto.value)
}
const editarProducto = async () => {
  if (tipo.value == 'Libro') {
    await service.editarLibro(nombreProducto.value, autor.value, pagado.value, idProducto.value)
  } else if (tipo.value == 'Cuaderno') {
    await service.editarCuaderno(nombreProducto.value, hojas.value, pagado.value, idProducto.value)
  }
  emits('emiteModal')
}
const borrarProducto = async () => {
  await service.deleteProducto(idProducto.value)
  emits('emiteModal')
}
</script>
<style scoped lang="scss">
#emailHelp {
  font-size: small;
}
</style>
