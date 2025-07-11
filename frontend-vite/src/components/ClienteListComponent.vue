<template>
  <div class="list row">
    <h5 class="nombreCliente col-10 col-sm-10 col-md-5 col-lg-5 col-xl-5">
      {{ props.content.nombre }} &nbsp;<ClienteModalComponent
        :nombre="props.content.nombre"
        :correo="props.content.correo"
        :idCliente="props.content.idString"
        @emiteModal="actualizarClienteEnElemento"
      />
    </h5>
    <p class="col-10 col-sm-10 col-md-5 col-lg-5 col-xl-5">
      <b>{{ $t('clientes.correo') }}</b
      ><br />
      {{ props.content.correo }}
    </p>

    <div class="d-flex align-items-center col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2">
      <ProductosDeClienteModalComponent
        :nombre="props.content.nombre"
        :idCliente="props.content.idString"
      />
    </div>
    <!--
        <router-link :to="{ name: 'productos-cliente', params: { id: props.content.idString } }"
            class="color-2 d-flex align-items-center col-10 col-sm-10 col-md-2 col-lg-2 col-xl-2">
            <button class="btn btn-dark"><b>Productos</b></button>
        </router-link>
        no entiendo por que cuando carga el componente modal peta al cargar los productos, sin embargo luego funciona...
    -->
  </div>
</template>
<script setup>
import ClienteModalComponent from './ClienteModalComponent.vue'
import ProductosDeClienteModalComponent from './ProductosDeClienteModalComponent.vue'
const props = defineProps(['content'])
const emits = defineEmits(['emiteElemento'])
function actualizarClienteEnElemento() {
  emits('emiteElemento')
}
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
.nombreCliente {
  color: $red;
}
</style>
