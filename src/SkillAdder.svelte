<script>
  import { loc } from "./stores/loc";
  import { skillList } from "./stores/skillList";

  let inputName = "";
  let inputRef;

  function handleAdd() {
    inputRef.focus();
    if (inputName === "") {
      return;
    }
    skillList.add({ name: inputName });
    inputName = "";
  }
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
  <input
    bind:value={inputName}
    bind:this={inputRef}
    placeholder={$loc['name']} />
  <button type="submit">{$loc['add']}</button>
</form>
