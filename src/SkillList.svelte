<script>
  import { skillList } from "./stores/skillList";
  import { loc } from "./stores/loc";
  import SkillAdder from "./SkillAdder.svelte";
</script>

<div>
  <ul>
    {#if $skillList.length === 0} 
      <li>{$loc['addSomeSkills']}</li>
    {/if}
    {#each $skillList as { name, level }}
      <li><b>{name}</b> <i>{level}</i></li>
    {/each}
  </ul>
  <SkillAdder />
</div>
