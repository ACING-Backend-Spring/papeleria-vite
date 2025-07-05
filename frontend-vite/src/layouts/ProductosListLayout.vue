<template>
        <div class="encabezado">
            <h3 class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3"><b>Cliente</b></h3>
            <h3 class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3"><b>Producto</b></h3>
            <h3 class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center"><b>Tipo</b></h3>
            <h3 class="col-10 col-sm-10 col-md-3 col-lg-3 col-xl-3"><b>Autor</b></h3>
            <h3 class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center"><b>Hojas</b></h3>
            <h3 class="col-10 col-sm-10 col-md-1 col-lg-1 col-xl-1 text-center"><b>Pagado</b></h3>
        </div>
        <ProductoListComponent v-for="(item, index) in props.content" :key="index" :content="item"
            @emiteElemento="actualizarProductoEnLayout" />
</template>
<script setup>
import ProductoListComponent from '@/components/ProductoListComponent.vue';

const props = defineProps(['content'])
const emits = defineEmits(['emiteLayout'])

function actualizarProductoEnLayout() {
    emits('emiteLayout')
}
</script>
<style scoped>
.encabezado {
    background-color: rgb(193, 223, 25);
    border-radius: 10px;
    padding: 10px;
    display: flex;
    width: 100%;
    margin: 10px;
    justify-content: space-around;
}
</style>