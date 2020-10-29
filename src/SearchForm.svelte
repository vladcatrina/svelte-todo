<script>
  import { display } from "./stores/display";
  import { loc } from "./stores/loc";

  let filterInput = $display.searchString;
  function handleFilterSubmit() {
    display.listSearchResults(filterInput);
  }

  function reset() {
    filterInput = "";
    handleFilterSubmit();
  }
</script>

<style>
  form {
    position: relative;
    display: block;
    width: fit-content;
  }
  input {
    transition: width 1s;
    width: 36px;
  }
  input:focus,
  .active {
    transition: width 1s;
    width: 128px;
  }
  #submit {
    display: none;
  }
  #submit.displayed {
    display: inline;
  }
  #clear {
    font-weight: bold;
    position: absolute;
    left: -20px;
    top: 6px;
    visibility: hidden;
    cursor: pointer;
    text-decoration: none;
    margin: 0 6px;
  }
  #clear.visible {
    visibility: visible;
  }
</style>

<form on:submit|preventDefault={handleFilterSubmit}>
  <input
    bind:value={filterInput}
    placeholder={"🔍"}
    class={filterInput !== '' ? 'active' : ''} />

  <button id="submit" type="submit" class={filterInput !== $display.searchString ? "displayed" : ""}>{$loc['submit']}</button>
  <a
    id="clear"
    class={filterInput !== '' ? 'visible' : ''}
    on:click={reset}>×</a>
</form>
