<script>
  import SkillList from "./SkillList.svelte";

  export let open;
  export let toggleSkillModal;
</script>

<style>
  .modal-bg {
    position: fixed;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .modal {
    position: absolute;
    width: 40%;
    top: 0;
    left: 0;
    right: 0;
    margin: 1% auto;
    z-index: 2;
  }

  .modal-content {
    padding: 12px;
    height: 100%;
  }

  #close-button {
    float: right;
  }
</style>

{#if open}
  <div class="modal-bg" on:click={toggleSkillModal}>
    <div class="modal" on:click={(e) => e.stopPropagation()}>
      <button id="close-button" on:click={toggleSkillModal}>×</button>
      <div class="modal-content">
        <SkillList />
      </div>
    </div>
  </div>
{/if}
