<script>
  import { TODO_TYPES } from "./constants";
  import { loc } from "./stores/loc";
  import SkillSelect from "./SkillSelect.svelte";
  import TimeInput from "./TimeInput.svelte";

  export let editedItem;
</script>

<style>
  table {
    width: 100%;
  }
  
  .right-column {
    display: flex;
  }

  .right-column input {
    width: 100%;
  }
</style>

<table>
  {#if TODO_TYPES[editedItem.type] === 'Quest'}
    <tr>
      <td>{$loc['skillRequirement']}</td>
      <td>
        <div class="right-column">
          <SkillSelect bind:value={editedItem.skillReq.skill} />
          {#if editedItem.skillReq.skill !== -1}
            <input bind:value={editedItem.skillReq.level} />
          {/if}
        </div>
      </td>
    </tr>
    <tr>
      <td>{$loc['xpReward']}</td>
      <td>
        <div class="right-column">
          <input bind:value={editedItem.xpReward} />
          <div class="right-column" />
        </div>
      </td>
    </tr>
  {:else if TODO_TYPES[editedItem.type] === 'Training'}
    <tr>
      <td>{$loc['skillReward']}</td>
      <td>
        <div class="right-column">
          <SkillSelect bind:value={editedItem.skillReward.skill} />
          {#if editedItem.skillReward.skill !== -1}
            <input bind:value={editedItem.skillReward.level} />
          {/if}
        </div>
      </td>
    </tr>
  {/if}
  <tr>
    <td>{$loc['timeLimit']}</td>
    <td>
      <div class="right-column">
        <TimeInput
          bind:value={editedItem.timeLimit}
          startDate={new Date(editedItem.date)} />
      </div>
    </td>
  </tr>
</table>
