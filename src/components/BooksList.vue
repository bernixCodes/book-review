<template>
    <section class="bg-blue-50 px-4 py-10">
      <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-blue-500 mb-6 text-center">Latest Books </h2>
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader/>
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="book in state.books.slice(0, limit || state.books.length)" :key="book.id" class="bg-white rounded-xl shadow-md relative">
                    <BookList :book="book"/>
                </div>
            </div>
          
       </div>
    </section>   

    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
      <RouterLink
        to="/books"
        class="block bg-blue-800 text-white text-center py-4 px-6 rounded-xl hover:bg-blue-700"
        >View All Books</RouterLink >
    </section>
</template>


<script setup>
    import { reactive, defineProps , onMounted} from 'vue';
    import BookList from './BookList.vue';
    import { RouterLink } from 'vue-router';
    import axios from 'axios';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    
    defineProps({
        limit: Number,
        showButton: {
            type: Boolean,
            default: false
        }
    });

    const state = reactive({
        books: [],
        isLoading: true
    })

    onMounted(async()=>{
        try {
            const response = await axios.get('http://localhost:5000/books')
            state.books = response.data
        } catch (error) {
            console.log(error)
        }
        finally{
            state.isLoading = false;
        }
    })
</script>