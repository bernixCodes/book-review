<template>
      <section class="bg-green-50">
      <div class="container m-auto max-w-2xl py-24">
        <div
          class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form @submit.prevent="handleSubmit">
            <h2 class="text-3xl text-center font-semibold mb-6">Add Book</h2>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2"
                >Book Name</label
              >
              <input
                type="text"
                id="name"
                name="name"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="Name of Book"
                v-model="form.title"
              />
              <!-- <span v-if="!$v.name">Book Title is required</span> -->
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2"
                >Author of Book</label
              >
              <input
                type="text"
                id="author"
                name="author"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="Author"
                required
                v-model="form.author"
              />
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2"
                >Genre</label
              >
              <input
                type="text"
                id="genre"
                name="genre"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="genre"
                required
                 v-model="form.details.genre"
              />
            </div>

            <div class="mb-4">
              <label
                for="description"
                class="block text-gray-700 font-bold mb-2"
                >Description</label
              >
              <textarea
                id="description"
                name="description"
                class="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Book Description"
                 v-model="form.details.description"
              ></textarea>
            </div>


            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2">
                Published Year
              </label>
              <input
                type="text"
                id="year"
                name="year"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="Year Published"
                required
                 v-model="form.details.publishedYear"
              />
            </div>
         
            <div>
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

</template>


<script setup>
import router from '@/router'
import axios from 'axios'
import {reactive} from 'vue'
// import useVuelidate from '@vuelidate/core';
// import { required } from '@vuelidate/validators';




const form = reactive({
    title: '',
    author: '',
    averageRating: 5,
    details:{
        publishedYear: '',
        genre: '',
        description:'',
    },
   
})

// const rules = {
//       name: { required },
//     };
// const v$ = useVuelidate(rules, form);


const handleSubmit = async ()=>{
    const newBook = {
        title: form.title,
        author: form.author,
        averageRating: 5,
        details:{
            publishedYear: form.details.publishedYear,
            genre: form.details.genre,
            description:form.details.description,
            reviews:[]
        },
        
    }
    try {
        // v$.value.$validate();

         const response = await axios.post('http://localhost:5000/books', newBook)
         router.push(`/books/${response.data.id}`)
        } catch (error) {
            console.log('Error adding book',error)
        }
}

</script>