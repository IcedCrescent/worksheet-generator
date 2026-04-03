<script lang="ts">
  export let h: number; // 1 to 12
  export let m: number; // 0 to 59
  export let size: number = 100; // default px size
  export let showHands: boolean = true;

  $: hourAngle = (h % 12) * 30 + (m / 60) * 30;
  $: minuteAngle = (m / 60) * 360;

  const ticks = Array.from({ length: 60 });
</script>

<svg viewBox="0 0 100 100" class="clock-svg" style="width: {size}px; height: {size}px;">
  <!-- Background -->
  <circle cx="50" cy="50" r="45" fill="white" stroke="#334155" stroke-width="2" />
  <circle cx="50" cy="50" r="42" fill="transparent" stroke="#cbd5e1" stroke-width="1" />
  
  <!-- Ticks -->
  {#each ticks as _, i}
    {#if i % 5 === 0}
      <line x1="50" y1="9" x2="50" y2="13" transform="rotate({i * 6} 50 50)" stroke="#334155" stroke-width="1.5" />
    {:else}
      <line x1="50" y1="10" x2="50" y2="12" transform="rotate({i * 6} 50 50)" stroke="#94a3b8" stroke-width="1" />
    {/if}
  {/each}

  <!-- Numbers -->
  <text x="50" y="21" text-anchor="middle" font-size="7" font-weight="bold" fill="#334155">12</text>
  <text x="64.5" y="25" text-anchor="middle" font-size="7" font-weight="bold" fill="#334155">1</text>
  <text x="75" y="35.5" text-anchor="middle" font-size="7" font-weight="bold" fill="#334155">2</text>
  <text x="79" y="52.5" text-anchor="middle" font-size="7" font-weight="bold" fill="#334155">3</text>
  <text x="75" y="69.5" text-anchor="middle" font-size="7" font-weight="bold" fill="#334155">4</text>
  <text x="64.5" y="80" text-anchor="middle" font-size="7" font-weight="bold" fill="#334155">5</text>
  <text x="50" y="84" text-anchor="middle" font-size="7" font-weight="bold" fill="#334155">6</text>
  <text x="35.5" y="80" text-anchor="middle" font-size="7" font-weight="bold" fill="#334155">7</text>
  <text x="25" y="69.5" text-anchor="middle" font-size="7" font-weight="bold" fill="#334155">8</text>
  <text x="21" y="52.5" text-anchor="middle" font-size="7" font-weight="bold" fill="#334155">9</text>
  <text x="25" y="35.5" text-anchor="middle" font-size="7" font-weight="bold" fill="#334155">10</text>
  <text x="35.5" y="25" text-anchor="middle" font-size="7" font-weight="bold" fill="#334155">11</text>

  <!-- Hands -->
  {#if showHands}
    <line x1="50" y1="50" x2="50" y2="30" transform="rotate({hourAngle} 50 50)" stroke="#334155" stroke-width="2.5" stroke-linecap="round" />
    <line x1="50" y1="50" x2="50" y2="18" transform="rotate({minuteAngle} 50 50)" stroke="#334155" stroke-width="1.5" stroke-linecap="round" />
  {/if}
  
  <!-- Pin -->
  <circle cx="50" cy="50" r="2.5" fill="#334155" />
  <circle cx="50" cy="50" r="1" fill="white" />
</svg>

<style>
  .clock-svg {
    display: block;
    margin: 0 auto;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.05));
  }
  text { font-family: 'Outfit', sans-serif; }
</style>
