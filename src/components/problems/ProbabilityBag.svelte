<script lang="ts">
  export let data: any;

  if (!data.initialized) {
    // Bag A: fewer black beads than white (so answer is "poor chance")
    const w1 = Math.floor(Math.random() * 3) + 2; // 2–4 white
    const b1 = 1; // always 1 black for bag A to keep it interesting
    // Bag B: more black than white (so answer leans "likely")
    const w2 = Math.floor(Math.random() * 2) + 2; // 2–3 white
    const b2 = Math.floor(Math.random() * 3) + 3; // 3–5 black
    
    data = { w1, b1, w2, b2, initialized: true };
  }

  function beadPositions(count: number): Array<[number, number]> {
    // Arrange beads in neat rows inside bag SVG (center ~50,55, radius ~18)
    const positions: Array<[number, number]> = [];
    const layouts: Record<number, Array<[number, number]>> = {
      1: [[50, 55]],
      2: [[42, 55], [58, 55]],
      3: [[50, 47], [42, 60], [58, 60]],
      4: [[42, 47], [58, 47], [42, 62], [58, 62]],
      5: [[50, 43], [41, 53], [59, 53], [43, 64], [57, 64]],
      6: [[41, 44], [59, 44], [41, 55], [59, 55], [43, 66], [57, 66]],
      7: [[50, 40], [41, 50], [59, 50], [41, 60], [59, 60], [44, 70], [56, 70]],
      8: [[40, 42], [60, 42], [40, 53], [60, 53], [40, 64], [60, 64], [48, 72], [52, 72]],
    };
    const total = Math.min(count, 8);
    return layouts[total] ?? layouts[8];
  }

  $: beadsA = [
    ...Array(data.w1).fill('white'),
    ...Array(data.b1).fill('black'),
  ].sort(() => Math.random() - 0.5);

  $: beadsB = [
    ...Array(data.w2).fill('white'),
    ...Array(data.b2).fill('black'),
  ].sort(() => Math.random() - 0.5);

  $: posA = beadPositions(beadsA.length);
  $: posB = beadPositions(beadsB.length);
</script>

<div class="worksheet-prob">
  <div class="statement fw-bold">Here are two bags.</div>

  <!-- Bag illustrations -->
  <div class="bags-row">
    <div class="bag-wrap">
      <svg viewBox="0 0 100 100" class="bag-svg">
        <!-- Bag body -->
        <path d="M30 35 Q28 20 38 15 Q50 10 62 15 Q72 20 70 35 Q80 48 75 70 Q72 88 50 90 Q28 88 25 70 Q20 48 30 35 Z"
          fill="#f1f5f9" stroke="#334155" stroke-width="2.5" />
        <!-- Bag neck tie -->
        <ellipse cx="50" cy="13" rx="9" ry="4" fill="#94a3b8" />
        <!-- Beads -->
        {#each beadsA as color, i}
          {#if posA[i]}
            <circle cx={posA[i][0]} cy={posA[i][1]} r="7"
              fill={color === 'black' ? '#334155' : 'white'}
              stroke="#334155" stroke-width="1.5" />
          {/if}
        {/each}
      </svg>
      <div class="bag-label">bag A</div>
    </div>

    <div class="bag-wrap">
      <svg viewBox="0 0 100 100" class="bag-svg">
        <path d="M30 35 Q28 20 38 15 Q50 10 62 15 Q72 20 70 35 Q80 48 75 70 Q72 88 50 90 Q28 88 25 70 Q20 48 30 35 Z"
          fill="#f1f5f9" stroke="#334155" stroke-width="2.5" />
        <ellipse cx="50" cy="13" rx="9" ry="4" fill="#94a3b8" />
        {#each beadsB as color, i}
          {#if posB[i]}
            <circle cx={posB[i][0]} cy={posB[i][1]} r="7"
              fill={color === 'black' ? '#334155' : 'white'}
              stroke="#334155" stroke-width="1.5" />
          {/if}
        {/each}
      </svg>
      <div class="bag-label">bag B</div>
    </div>
  </div>

  <div class="statement" style="margin-bottom: 1.5rem;">
    Isaac takes a bead without looking from each bag in turn.
  </div>

  <!-- Part a -->
  <div class="sub-problem">
    <span class="letter">a.</span> What is the chance of Isaac taking a black bead from bag A?<br>
    <div class="hint">Draw a ring around one answer:</div>
    <div class="options">
      <span>No chance</span>
      <span>Poor chance</span>
      <span>Even chance</span>
      <span>Good chance</span>
      <span>Certain</span>
    </div>
  </div>

  <!-- Part b -->
  <div class="sub-problem" style="margin-top: 2rem;">
    <span class="letter">b.</span> What is the probability of Isaac taking a black bead from bag B?<br>
    <div class="hint">Mark your answer with an arrow (↓) on the probability line.</div>
    
    <div class="prob-line-wrap">
      <!-- Number line SVG -->
      <svg viewBox="0 0 400 60" class="prob-line-svg">
        <!-- Main line -->
        <line x1="30" y1="25" x2="370" y2="25" stroke="#334155" stroke-width="2" />
        <!-- End caps -->
        <line x1="30" y1="18" x2="30" y2="32" stroke="#334155" stroke-width="2" />
        <line x1="370" y1="18" x2="370" y2="32" stroke="#334155" stroke-width="2" />
        <!-- Tick marks at quarters -->
        <line x1="115" y1="20" x2="115" y2="30" stroke="#334155" stroke-width="2" />
        <line x1="200" y1="20" x2="200" y2="30" stroke="#334155" stroke-width="2" />
        <line x1="285" y1="20" x2="285" y2="30" stroke="#334155" stroke-width="2" />
        <!-- 0 and 1 -->
        <text x="28" y="14" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">0</text>
        <text x="372" y="14" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">1</text>
        <!-- Labels -->
        <text x="30" y="48" text-anchor="middle" font-size="10" fill="#334155">impossible</text>
        <text x="115" y="48" text-anchor="middle" font-size="10" fill="#334155">unlikely</text>
        <text x="200" y="48" text-anchor="middle" font-size="10" fill="#334155">even</text>
        <text x="285" y="48" text-anchor="middle" font-size="10" fill="#334155">likely</text>
        <text x="370" y="48" text-anchor="middle" font-size="10" fill="#334155">certain</text>
      </svg>
    </div>
  </div>

  <!-- Part c -->
  <div class="sub-problem" style="margin-top: 2rem;">
    <span class="letter">c.</span> Underline the correct answer.<br>
    <div style="margin-top: 0.75rem;">
      It is more likely to get a white marble from <strong>bag A</strong> / <strong>bag B</strong>.
    </div>
  </div>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.5; }
  .statement { padding-left: 0.5rem; }
  .fw-bold { font-weight: 600; margin-bottom: 0.5rem; }
  .sub-problem { padding-left: 1.5rem; margin-bottom: 1rem; }
  .letter { font-weight: bold; margin-right: 0.25rem; }
  .hint { margin-top: 0.4rem; margin-bottom: 0.75rem; }

  /* Bag visuals */
  .bags-row { display: flex; gap: 3rem; justify-content: center; margin: 1.5rem 0 2rem; }
  .bag-wrap { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
  .bag-svg { width: 110px; height: 110px; }
  .bag-label { font-size: 1rem; font-weight: 600; color: var(--text-main); }

  /* Chance options */
  .options {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    font-size: 1rem;
    padding: 0.75rem 1rem;
    background-color: var(--bg-color);
    border-radius: var(--radius-sm);
  }

  /* Probability line */
  .prob-line-wrap { margin-top: 1.5rem; margin-bottom: 0.5rem; }
  .prob-line-svg { width: 100%; max-width: 480px; display: block; margin: 0 auto; }
</style>
