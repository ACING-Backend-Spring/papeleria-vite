<template>
  <div class="card">
    <h5 class="nombreCliente">
      {{ props.content.nombre }}
      &nbsp;
      <ClienteModalComponent
        :nombre="props.content.nombre"
        :correo="props.content.correo"
        :idCliente="props.content.idString"
        @emiteModal="actualizarClienteEnElemento"
      />
    </h5>
    <p>
      <a href="#" data-bs-toggle="tooltip" :title="$t('clientes.correo')"
        ><v-icon name="oi-mail" color="red" scale="2"
      /></a>
      {{ props.content.correo }}
    </p>
    <div class="text-center">
      <ProductosDeClienteModalComponent
        :nombre="props.content.nombre"
        :idCliente="props.content.idString"
      />
    </div>
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

.nombreCliente {
  color: $blue;
}
</style>
