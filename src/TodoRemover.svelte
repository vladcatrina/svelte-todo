<script>
  export let index;
  import { todoList } from "./stores/todoList";

  const handleRemove = () => {
    todoList.remove(index);
  };
</script>

<button on:click={handleRemove}>&#215;</button>
