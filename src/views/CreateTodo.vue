<template>
  <div class="create-todo">
    <h1>Create a New Todo</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" v-model="newTodo.title" id="title" placeholder="Enter task title" required />
      </div>
      <div class="form-group">
        <label for="text">Description:</label>
        <textarea v-model="newTodo.text" id="text" placeholder="Enter task details" required></textarea>
      </div>
      <div class="form-group">
        <label for="time">Due Time:</label>
        <input type="datetime-local" v-model="newTodo.time" id="time" required />
      </div>
      <button type="submit" class="submit-button">Save Todo</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newTodo: {
          title: '',
          text: '',
          time: '',
          status: false,
          id: Date.now(),
        },
      };
    },
    methods: {
      submitForm() {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.push(this.newTodo);
        localStorage.setItem("todos", JSON.stringify(todos));
        this.$router.push('/');
      },
    },
  };
</script>
