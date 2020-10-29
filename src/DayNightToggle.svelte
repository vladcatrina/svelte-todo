<script>
  export let nightMode;
  export let toggleNightMode;
</script>

<style>
  .day-night-toggle {
    position: absolute;
    font-weight: bold;
    font-family: "Courier New", Courier, monospace;
    font-size: 16px;
    width: 80px;
    height: 40px;
    cursor: pointer;
    top: 12px;
    right: 0;
  }

  span {
    z-index: 1;
  }

  .switch {
    position: absolute;
    border-radius: 100%;
    height: 16px;
    width: 16px;
    background-color: black;
    left: 0px;
    top: -5px;
  }

  .slider {
    position: absolute;
    height: 8px;
    width: 34px;
    left: 22px;
    top: 7px;
    border-radius: 10px;
    z-index: 0;
    background-color: white;
  }

  .switch.on {
    left: auto;
    right: 0px;
  }

  .sun {
    position: absolute;
    left: 0;
  }

  .moon {
    position: absolute;
    right: 0;
  }
</style>

<div class="day-night-toggle" on:click={toggleNightMode}>
  <span class="sun">☀️</span>
  <span class="slider">
    <span class={`switch ${nightMode ? 'on' : 'off'}`}>&nbsp;</span>
  </span>
  <span class="moon">🌑</span>
</div>
