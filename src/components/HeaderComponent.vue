<template>
    <nav class="bg-blue-700 border-b ">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
     <div class="flex h-20 items-center justify-between">
       <div
         class="flex flex-1 items-center justify-center md:justify-start"
       >
         <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
           <span class="text-white text-2xl font-bold ml-2"
             >booksReVue</span
           >
         </RouterLink>
         <div class="md:ml-auto">
           <div class="flex space-x-2">
             <RouterLink
               to="/"
               :class="[isActiveLink('/') ? 'bg-blue-900' : '']"
               class="text-white  hover:bg-blue-600 hover:text-white rounded-md px-3 py-2"
               >Home
               </RouterLink>
             <RouterLink
               to="/books"
                :class="[isActiveLink('/books') ? 'bg-blue-900' : '']"
               class="text-white hover:bg-blue-600 hover:text-white rounded-md px-3 py-2"
               >Books
               </RouterLink>
             <RouterLink
               to="/books/add"
                :class="[isActiveLink('/books/add') ? 'bg-blue-900' : '']"
               class="text-white hover:bg-blue-600 hover:text-white rounded-md px-3 py-2"
               >Add Book</RouterLink>
           </div>
         </div>
       </div>
     </div>
   </div>
 </nav>
</template>


<script setup>
 import { RouterLink,useRoute } from 'vue-router';

 const isActiveLink = (routePath) =>{
  const route = useRoute();
  return route.path === routePath;
 }
 
</script>