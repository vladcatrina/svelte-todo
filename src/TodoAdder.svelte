<script>
  import { todoList } from "./stores/todoList";
  import { loc } from "./stores/loc";
  import TodoTypeSelect from "./TodoTypeSelect.svelte";

  let inputContent = "";
  let inputRef;
  let inputType;

  export let todoListIndex;

  const handleAdd = () => {
    inputRef.focus();
    if (inputContent === "") {
      // alert("Todo content empty!"); //change later
      return;
    }

    todoList.add({
      content: inputContent,
      date: new Date(),
      type: inputType,
    });
    inputContent = "";
  };
</script>

<style>
  form {
    display: flex;
  }

  input {
    width: 100%;
  }
</style>

<form on:submit|preventDefault={handleAdd}>
  <input bind:value={inputContent} bind:this={inputRef} placeholder={$loc['content']} />&nbsp;
    <TodoTypeSelect bind:value={inputType} {todoListIndex}/>&nbsp;
  <button type="submit">{$loc['add']}</button>
</form>
