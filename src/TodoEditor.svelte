<script>
  import { loc } from "./stores/loc";
  import { onMount } from "svelte";
  import { isNumber } from "./helpers";
  import TodoTypeSelect from "./TodoTypeSelect.svelte";
  import TodoSecondaryFields from "./TodoSecondaryFields.svelte";
import { prevent_default } from "svelte/internal";

  export let initialItem;
  export let handleTodoEditSave;
  export let index;

  let editedItem = { ...initialItem };
  let inputRef;

  onMount(() => {
    inputRef.focus();
  });

  function validate(item) {
    //MOVE & EXPAND IF NEEDED
    if (!isNumber(item.xpReward)) {
      alert("XP REWARD NOT A NUMBER");
      return false;
    }
    if (!isNumber(item.timeLimit)) {
      alert("TIME LIMIT NOT A NUMBER");
      return false;
    }

    return true;
  }

  function handleSubmit() {
    if (validate(editedItem)) {
      handleTodoEditSave(index, editedItem);
    }
  }
</script>

<style>
  input {
    width: 100%;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <div style="display: flex;">
    <input bind:value={editedItem.content} bind:this={inputRef} />
    <TodoTypeSelect bind:value={editedItem.type} />
    <button> {$loc['save']} </button>
  </div>
  <div>
    <TodoSecondaryFields bind:editedItem />
  </div>
</form>
