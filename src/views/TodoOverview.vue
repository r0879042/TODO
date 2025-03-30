<template>
  <div class="todo-overview">
    <h1>My Todo List</h1>

    <!-- Filter Buttons -->
    <div class="filters">
      <button @click="filterTodos('all')" :class="{'active': filter === 'all'}">All</button>
      <button @click="filterTodos('done')" :class="{'active': filter === 'done'}">Done</button>
      <button @click="filterTodos('pending')" :class="{'active': filter === 'pending'}">Pending</button>
      <button @click="filterTodos('overdue')" :class="{'active': filter === 'overdue'}">Overdue</button>
      <button @click="filterTodos('ontime')" :class="{'active': filter === 'ontime'}">On Time</button>
    </div>

    <!-- No Todos Message -->
    <div v-if="filteredTodos.length === 0" class="empty-message">
      <p>No tasks yet! Add a task to get started.</p>
    </div>

    <!-- Todo List -->
    <div v-for="todo in filteredTodos" :key="todo.id" class="todo-item">
      <router-link :to="'/todo/' + todo.id" class="todo-link">
        <div class="todo-card">
          <h2>{{ todo.title }}</h2>
          <p>{{ todo.text }}</p>
          <span :class="{'done': todo.status}">Status: {{ todo.status ? 'Done' : 'Pending' }}</span>
          <button @click.stop="toggleStatus(todo.id)" class="status-btn">{{ todo.status ? 'Mark as Pending' : 'Mark as Done' }}</button>
        </div>
      </router-link>
    </div>

    <router-link to="/create">
      <button class="add-button">Add Todo</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
      filter: 'all', 
    };
  },
  computed: {
    
    filteredTodos() {
      if (this.filter === 'done') {
        return this.todos.filter(todo => todo.status === true);
      } else if (this.filter === 'pending') {
        return this.todos.filter(todo => todo.status === false);
      } else if (this.filter === 'overdue') {
        return this.todos.filter(todo => new Date(todo.time) < new Date() && !todo.status);
      } else if (this.filter === 'ontime') {
        return this.todos.filter(todo => new Date(todo.time) >= new Date() && !todo.status);
      } else {
        return this.todos;
      }
    },
  },
  methods: {
    toggleStatus(id) {
      const todos = this.todos;
      const todo = todos.find(t => t.id === id);
      todo.status = !todo.status; 
      localStorage.setItem("todos", JSON.stringify(todos));
    },
    filterTodos(type) {
      this.filter = type; 
    },
  },
};
</script>

<style scoped>
.todo-overview {
  width: 100%;
  max-width: 500px;
  margin-top: 50px;
}

h1 {
  color: #ff6f61;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff3b2f;
}

button.active {
  background-color: #ff3b2f;
}

.todo-item {
  margin: 15px 0;
}

.todo-link {
  text-decoration: none;
}

.todo-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.todo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.done {
  color: #4caf50; /* Green for done tasks */
}

.add-button {
  padding: 10px 20px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.add-button:hover {
  background-color: #ff3b2f;
}

.empty-message p {
  font-size: 1.2em;
  color: #ff6f61;
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
</style>
