<template>
  <h1>PRODUCTOS DEL CLIENTE Nº {{ idCliente }}</h1>
  <h3 v-if="!hayProductos" class="mt-3 sinProductos">Este cliente no tiene productos</h3>
  <div class="text-center">
    <RouterLink :to="{ name: 'clientes' }">
      <button class="btn btn-success">Volver</button>
    </RouterLink>
  </div>
  <hr />
  <div class="text-center" v-if="hayProductos">
    <div
      v-for="(producto, index) in productos"
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
            <span class="mr-2"><b>Tipo:</b>&nbsp;</span>
            <span>{{ producto.tipo }}</span>
          </p>
          <p class="card-text" v-if="producto.tipo == 'Libro'">
            <span class="mr-2"><b>Autor:</b>&nbsp;</span>
            <span>{{ producto.autor }}</span>
          </p>
          <p class="card-text" v-if="producto.tipo == 'Cuaderno'">
            <span class="mr-2"><b>Nº de hojas:</b>&nbsp;</span>
            <span>{{ producto.hojas }}</span>
          </p>
          <p class="card-text">
            <span class="mr-2"><b>Pagado:</b>&nbsp;</span>
            <span v-if="producto.pagado">Sí</span>
            <span v-else>No</span>
          </p>
        </div>
      </div>
    </div>
    <hr />
    <RouterLink :to="{ name: 'clientes' }">
      <button class="btn btn-success">Volver</button>
    </RouterLink>
  </div>
</template>
<script setup>
import ProductoService from '@/services/ProductoService'
import { onMounted, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const router = useRoute()
let idCliente = ref(router.params.id)
const service = new ProductoService()
let productos = service.getProductos()
let hayProductos = ref(false)
onMounted(async () => {
  await service.getProductosDeCliente(idCliente.value)
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
</style>
