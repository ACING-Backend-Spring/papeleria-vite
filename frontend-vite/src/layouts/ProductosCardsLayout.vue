<template>
    <div class="container">
        <ProductoCardComponent v-for="(item, index) in props.content" :key="index" :content="item" @emiteElemento="actualizarProductoEnLayout"/>
    </div>
</template>
<script setup>
import ProductoCardComponent from '@/components/ProductoCardComponent.vue';
const props = defineProps(['content'])
const emits = defineEmits(['emiteLayout'])
function actualizarProductoEnLayout() {
    emits('emiteLayout')
}

</script>
<style scoped>
.container {
    width: 100vw;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
}
</style>