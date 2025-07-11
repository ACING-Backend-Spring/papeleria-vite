<template>
  <div class="list">
    <p class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">{{ cliente }}</p>
    <h5 class="nombreProducto col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">
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
    <p
      class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center"
      v-if="props.content.tipo == 'Libro'"
    >
      <a href="#" data-bs-toggle="tooltip" :title="$t('productos.libro')"
        ><v-icon name="fa-book" color="blue" scale="2"
      /></a>
    </p>
    <p
      class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center"
      v-if="props.content.tipo == 'Cuaderno'"
    >
      <a href="#" data-bs-toggle="tooltip" :title="$t('productos.cuaderno')"
        ><v-icon name="fa-address-book" color="red" scale="2"
      /></a>
    </p>
    <p class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3">{{ props.content.autor }}</p>
    <p class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center">{{ props.content.hojas }}</p>
    <p class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center" v-if="props.content.pagado">
      <a href="#" data-bs-toggle="tooltip" :title="$t('productos.pagado')"
        ><v-icon name="fa-check" color="green" scale="2"
      /></a>
    </p>
    <p class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center" v-if="!props.content.pagado">
      <a href="#" data-bs-toggle="tooltip" :title="$t('productos.noPagado')"
        ><v-icon name="fa-times" color="red" scale="2"
      /></a>
    </p>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import ProductoModalComponent from './ProductoModalComponent.vue'
import ProductoService from '@/services/ProductoService'
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
.list {
  background-color: rgb(204, 209, 209);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  width: 100%;
  margin: 10px;
  justify-content: space-around;
}

.list:hover {
  background-color: aqua;
}

.nombreProducto {
  color: green;
}
</style>
