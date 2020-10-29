<script>
  import { skillList } from "./stores/skillList";
  import SkillAdder from "./SkillAdder.svelte";
</script>

<div>
  <ul>
    {#each $skillList as { name, level }}
      <li><b>{name}</b> <i>{level}</i></li>
    {/each}
  </ul>
  <SkillAdder />
</div>
