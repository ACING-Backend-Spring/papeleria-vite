<template>
    <div class="container">
        <ClienteListComponent v-for="(item, index) in props.content" :key="index" :content="item" @emiteElemento="actualizarClienteEnLayout"/>
    </div>
</template>
<script setup>
import ClienteListComponent from '@/components/ClienteListComponent.vue';

const props = defineProps(['content'])
const emits = defineEmits(['emiteLayout'])

function actualizarClienteEnLayout() {
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