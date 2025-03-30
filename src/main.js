import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import TodoOverview from './views/TodoOverview.vue';
import CreateTodo from './views/CreateTodo.vue';
import TodoDetail from './views/TodoDetail.vue';

const routes = [
  { path: '/', component: TodoOverview },
  { path: '/create', component: CreateTodo },
  { path: '/todo/:id', component: TodoDetail, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');