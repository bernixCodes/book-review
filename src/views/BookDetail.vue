<template>
    <section>
    <div class="container m-auto py-6 px-6">
      <RouterLink
        to="/books"
        class="text-blue-500 hover:text-blue-600 flex items-center"
      >
        <i class="pi pi-arrow-left mr-2"></i> Back to All Book 
      </RouterLink>
    </div>
  </section>

  <section v-if="!state.isLoading" class="bg-text-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div
            class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
          >
            <div class="text-gray-500 mb-4">{{ state.book.details.genre }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ state.book.title }}</h1>
            <div
              class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
            >
              <p class="text-orange-700"> <span class="text-black">By</span> {{ state.book.author }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-blue-800 text-lg font-bold mb-6">
              Book Description
            </h3>

            <p class="mb-4">
              {{ state.book.details.description }}
            </p>

            <h3 class="text-blue-800 text-lg font-bold mb-2">Facts</h3>

              <p>Current Rating - {{ state.book.averageRating}}</p>
            <p class="mb-4">Published in - {{ state.book.details.publishedYear}} </p>
          </div>
        </main>

        <aside>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Reviews</h3>
            <!-- <pre>
              {{ state.book.details.reviews }}
            </pre> -->

      <transition name="switch" mode="out-in">
        <div v-if="state.book.details.reviews.length">
          <div v-for="review in state.book.details.reviews" :key="review.userId">
             <div class="p-6 rounded-lg shadow-md">
              <p class="font-bold mb-2">Reviewer: 
               <span class="text-gray-700">{{ review.userName }}</span>
              </p>
              <p class="font-bold mb-2">Comment: 
               <span class="text-gray-700">{{ review.comment }}</span></p>
              <p class="font-bold mb-2">Rating: 
               <span class="text-gray-700"> {{ review.rating }}</span></p>
               
            </div>
         </div>
        </div>
        <div v-else>No Reviews yet. </div>
      </transition>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 class="text-xl font-bold mb-6">Contribute </h3>

          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2"
                >User Name</label
              >
              <input
                type="text"
                id="name"
                name="name"
                class="border rounded w-full py-2 px-3 mb-2"
                placeholder="username"
                required
                v-model="state.reviews.userName"
                v-namefocus
              />
            </div>
            <div class="mb-4">
              <label for="type" class="block text-gray-700 font-bold mb-2"
                >Book Rating</label
              >
              <select
                id="type"
                name="type"
                class="border rounded w-full py-2 px-3"
                required
                   v-model="state.reviews.rating"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div class="mb-4">
              <label
                for="description"
                class="block text-gray-700 font-bold mb-2"
                >Comment</label
              >
              <textarea
                id="description"
                name="description"
                class="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add your comment here"
                   v-model="state.reviews.comment"
              ></textarea>
            </div>

           <button
            class="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >Add Review</button>
          </form>
        
        </div>
        </aside>
      </div>
    </div>
  </section>

  <div v-else class="text-center text-gray-500 py-6"> <PulseLoader/></div>
</template>


<script setup>
import { RouterLink, useRoute } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { reactive, onMounted } from 'vue';
import axios from 'axios';

const route = useRoute();
const bookId = route.params.id;

const state = reactive({
book:{},
isLoading: true,
reviews:{
  userName: '',
    rating: '',
    comment: ''
}
})

onMounted(async()=>{
      try {
          const response = await axios.get(`http://localhost:5000/books/${bookId}`)
          state.book = response.data
      } catch (error) {
          console.log(error)
      }
      finally{
          state.isLoading = false;
      }
  });

  const vNamefocus = {
    mounted:(el)=>{
      el.focus()
    }
  }

  const resetReviewForm = () => {
  state.reviews.userName = '';
  state.reviews.rating = '';
  state.reviews.comment = '';
};

  const handleSubmit = async ()=>{
    const newReview = {
          userId: 4,
          userName: state.reviews.userName, 
          rating: state.reviews.rating, 
          comment: state.reviews.comment, 
        }

    try {
      const bookResponse = await axios.get(`http://localhost:5000/books/${bookId}`);
      const book = bookResponse.data;
      book.details.reviews.push(newReview);
      await axios.put(`http://localhost:5000/books/${bookId}`, book);
    
      state.book.details.reviews = [...state.book.details.reviews, newReview];
      resetReviewForm();
        } catch (error) {
            console.log('Error adding book',error)
        }
}
</script>



<style scoped>
  .switch-enter-from,
  .switch-leave-to{
    opacity: 0;
    transform: translateY(20px);
  }

  .switch-enter-active,
  .switch-leave-active{
    transition: all 0.5s ease;
  }


  
</style>