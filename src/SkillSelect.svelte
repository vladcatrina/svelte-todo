<script>
  export let value;
  import { loc } from "./stores/loc";
  import { skillList } from "./stores/skillList";
</script>

<select bind:value>
  <option value={-1}>{$loc['none']}</option>
  {#each $skillList as { name }, index}
    <option value={index}>{name}</option>
  {/each}
</select>
