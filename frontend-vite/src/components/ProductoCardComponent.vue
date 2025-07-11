<template>
  <div class="card">
    <h5 class="nombreProducto">
      {{ props.content.nombre }}
      &nbsp;
      <ProductoModalComponent
        :nombre="props.content.nombre"
        :tipo="props.content.tipo"
        :idProducto="props.content.idString"
        :autor="props.content.autor"
        :hojas="props.content.hojas"
        :pagado="props.content.pagado"
        @emiteModal="actualizarProductoEnElemento"
      />
    </h5>
    <p class="text-center" v-if="props.content.tipo == 'Libro'">
      <a href="#" data-bs-toggle="tooltip" :title="$t('productos.libro')"
        ><v-icon name="fa-book" color="blue" scale="2"
      /></a>
    </p>
    <p class="text-center" v-if="props.content.tipo == 'Cuaderno'">
      <a href="#" data-bs-toggle="tooltip" :title="$t('productos.cuaderno')"
        ><v-icon name="fa-address-book" color="red" scale="2"
      /></a>
    </p>
    <p>
      <b>{{ toTitleCase($t('clientes.clientes', 1)) }}:</b>&nbsp;{{ cliente }}
    </p>
    <p v-if="props.content.tipo == 'Libro'">
      <b>{{ $t('productos.autor') }}:</b>&nbsp;{{ props.content.autor }}
    </p>
    <p v-if="props.content.tipo == 'Cuaderno'">
      <b>{{ $t('productos.hojas') }}:</b>&nbsp; {{ props.content.hojas }}
    </p>
    <p>
      <b>{{ $t('productos.pagado') }}:</b>&nbsp;
      <span v-if="props.content.pagado"
        ><a href="#" data-bs-toggle="tooltip" :title="$t('productos.pagado')"
          ><v-icon name="fa-check" color="green" scale="2" /></a
      ></span>
      <span v-if="!props.content.pagado"
        ><a href="#" data-bs-toggle="tooltip" :title="$t('productos.noPagado')"
          ><v-icon name="fa-times" color="red" scale="2" /></a
      ></span>
    </p>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import ProductoModalComponent from './ProductoModalComponent.vue'
import ProductoService from '@/services/ProductoService'
import { toTitleCase } from '@/utils'
const props = defineProps(['content'])
const emits = defineEmits(['emiteElemento'])
function actualizarProductoEnElemento() {
  emits('emiteElemento')
}
const service = new ProductoService()
let cliente = ref('')
onMounted(async () => {
  cliente.value = await service.getClienteDeProducto(props.content.idString)
})
</script>
<style scoped lang="scss">
.card {
  background-color: rgb(204, 209, 209);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 350px;
  margin: 10px;
}

.card:hover {
  background-color: aqua;
}

.nombreProducto {
  color: green;
}
</style>
