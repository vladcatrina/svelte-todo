<script>
  export let value;
  export let todoListIndex = -1;
  import { TODO_TYPES } from "./constants";
  import { display } from "./stores/display";
</script>

<select bind:value>
  {#each TODO_TYPES as type, index}
    {#if (todoListIndex !== -1 && todoListIndex === index) || !$display.separateDisplay || todoListIndex === -1}
      <option value={index}>{type}</option>
    {/if}
  {/each}
</select>
