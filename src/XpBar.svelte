<script>
  import { xp } from "./stores/xp";
  const xpMax = 500;
</script>

<style>
  .xp-bar-container {
    opacity: 0.5;
    transition: opacity 0.5s;
  }

  .xp-bar-container:hover {
    opacity: 0.6;
    transition: opacity 0.5s;
  }

  .xp-bar {
    position: relative;
    width: 100%;
    height: 12px;
    background-color: white;
    border-radius: 12px;
    border: solid 0.2px #ccc;
  }

  .xp-fill {
    position: absolute;
    height: calc(100% - 2px);
    left: 1px;
    top: 1px;
    background-color: brown;
    border-radius: 12px;
  }
</style>

<div class="xp-bar-container">
  <abbr title={`${$xp} XP`}>
    <div class="xp-bar">
      <div
        class="xp-fill"
        style={`width: calc(${Math.floor(($xp * 100) / xpMax)}% - 2px);`} />
    </div>
  </abbr>
</div>
