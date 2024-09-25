<template>
    <div class="p-4">
    <div class="mb-6">
        <div class="text-gray-600 my-2">{{ book.details.genre }}</div>
        <h3 class="text-xl font-bold">{{ book.title }}</h3>
    </div>

    <div class="mb-2">
    <div>
        {{ truncateDescription }}
    </div>
    <button @click="toggleDescription" class="text-blue-500 hover:text-blue-600 mb-5">{{ showFullDescription? "Less" : "More" }}</button>
    </div>

    <h3 class="text-blue-500 mb-2">
        <span class="text-black">Author: </span>
         {{ book.author }} </h3>

    <div class="border border-gray-100 mb-5"></div>

    <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-orange-700 mb-3">
            <span class="text-black">Rating: </span>
        {{ book.averageRating }}
        </div>
        <RouterLink
        :to="`/books/${book.id}`"
        class="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
        Read More
        </RouterLink>
    </div></div>
</template>


<script setup>
import {defineProps, ref, computed} from 'vue'
import { RouterLink } from 'vue-router';
const showFullDescription = ref(false)

const props = defineProps({
    book: Object
});

const toggleDescription = ()=>{
    showFullDescription.value = !showFullDescription.value;
}

const truncateDescription = computed(()=>{
   let description = props.book.details.description;
   if(!showFullDescription.value){
    description.substring(0, 20) + "..."
}
return description;
});
</script>