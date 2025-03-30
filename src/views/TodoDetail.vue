<template>
  <div class="todo-detail">
    <div v-if="todo">
      <h1>{{ todo.title }}</h1>
      <p><strong>Description:</strong> {{ todo.text }}</p>
      <p><strong>Status:</strong> <span :class="{'done': todo.status}">{{ todo.status ? 'Done' : 'Pending' }}</span></p>
      <p><strong>Due Time:</strong> {{ todo.time }}</p>
      <button @click="toggleStatus" class="status-btn">{{ todo.status ? 'Mark as Pending' : 'Mark as Done' }}</button>
    </div>
    <div v-else>
      <p>Todo not found!</p>
    </div>
    <router-link to="/">
      <button class="back-button">Back to Todo List</button>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      todo: null,
    };
  },
  created() {
    // Find todo by ID
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    this.todo = todos.find(t => t.id === parseInt(this.id)); 
  },
  methods: {
    toggleStatus() {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      const todo = todos.find(t => t.id === this.todo.id);
      todo.status = !todo.status;
      localStorage.setItem("todos", JSON.stringify(todos));
    },
  },
};
</script>

<style scoped>
.todo-detail {
  width: 100%;
  max-width: 500px;
  margin-top: 50px;
}

h1 {
  color: #ff6f61;
  margin-bottom: 20px;
}

.done {
  color: #4caf50;
}

.status-btn {
  padding: 8px 16px;
  background-color: #f2f2f2;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.status-btn:hover {
  background-color: #ff6f61;
  color: white;
}

.status-btn:active {
  transform: translateY(2px);
}

.back-button {
  padding: 10px 20px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.back-button:hover {
  background-color: #ff3b2f;
}
</style>
