<script lang="ts">
  export let data: any;

  if (!data.initialized) {
    // Generate 6 random integers between -9 and 9, ensure mix of +/-
    const pool = Array.from({ length: 19 }, (_, i) => i - 9).filter(n => n !== 0);
    const shuffled = pool.sort(() => Math.random() - 0.5);
    const nums = shuffled.slice(0, 6);
    const min = Math.min(...nums) - 1;
    const max = Math.max(...nums) + 1;
    data = { nums, min, max, initialized: true };
  }

  $: displayNums = [...data.nums].sort(() => Math.random() - 0.5);

  // Build tick positions for the SVG number line
  const svgW = 440, padL = 20, padR = 20;
  $: lineW = svgW - padL - padR;
  $: range = data.max - data.min;
  $: xOf = (n: number) => padL + ((n - data.min) / range) * lineW;
</script>

<div class="worksheet-prob">
  <div class="statement">Put these numbers in order on the number line.</div>

  <div class="num-strip">
    {#each data.nums as n}
      <span class="chip">{n}</span>
    {/each}
  </div>

  <div class="line-wrap">
    <svg viewBox="0 0 {svgW} 55" class="line-svg">
      <!-- Arrow line -->
      <line x1={padL} y1="22" x2={svgW - padR} y2="22" stroke="#334155" stroke-width="2"/>
      <polygon points="{svgW - padR},{22} {svgW - padR - 8},{17} {svgW - padR - 8},{27}" fill="#334155"/>

      <!-- Ticks and labels for every integer in range -->
      {#each Array.from({ length: range + 1 }, (_, i) => data.min + i) as n}
        {@const x = xOf(n)}
        <line x1={x} y1="17" x2={x} y2="27" stroke="#334155" stroke-width={n === 0 ? 2.5 : 1.5}/>
        <text x={x} y="42" text-anchor="middle" font-size="9" fill="#334155">{n}</text>
      {/each}
    </svg>
  </div>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.6; }
  .statement { font-weight: 600; padding-left: 0.5rem; margin-bottom: 1.5rem; }
  .num-strip { display: flex; gap: 1.5rem; justify-content: center; margin-bottom: 2rem; flex-wrap: wrap; }
  .chip { font-size: 1.3rem; font-weight: 500; min-width: 2.5rem; text-align: center; }
  .line-wrap { padding: 0 0.5rem; }
  .line-svg { width: 100%; display: block; }
  text { font-family: 'Inter', sans-serif; }
</style>
