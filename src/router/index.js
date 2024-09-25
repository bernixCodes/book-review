import AddBookView from "@/views/AddBookView.vue";
import BookDetail from "@/views/BookDetail.vue";
import BooksView from "@/views/BooksView.vue";
import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/books",
    name: "books",
    component: BooksView,
  },
  {
    path: "/books/add",
    name: "addbook",
    component: AddBookView,
  },
  {
    path: "/books/:id",
    name: "book",
    component: BookDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
