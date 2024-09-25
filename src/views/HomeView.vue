<template>
    <HeroComponent />
    <BooksList limit="3" showButton="true"/>
</template>

<script setup>
    import HeroComponent from '@/components/HeroComponent.vue';
    import BooksList from '@/components/BooksList.vue'
</script>