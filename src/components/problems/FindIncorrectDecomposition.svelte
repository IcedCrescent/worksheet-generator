<script lang="ts">
  export let data: any;

  if (!data.initialized) {
    // Build a 5-digit number with distinct non-zero digits
    const placeValues = [10000, 1000, 100, 10, 1];
    const digits = Array.from({ length: 5 }, () => Math.floor(Math.random() * 9) + 1);
    const num = digits.reduce((acc, d, i) => acc + d * placeValues[i], 0);
    
    const correctDecomp = digits.map((d, i) => d * placeValues[i]).filter(v => v > 0).sort((a, b) => b - a);
    const correctStr = correctDecomp.join(' + ');

    // Permutations of the correct decomp (all correct, re-ordered)
    const perm1 = [...correctDecomp].reverse().join(' + ');
    const perm2 = [...correctDecomp].sort(() => Math.random() - 0.5).join(' + ');
    
    // One wrong: swap one digit's place value
    const wrongDigits = [...digits];
    const swapIdx = Math.floor(Math.random() * 4);
    // Swap adjacent place values for that digit
    const swapped = wrongDigits.map((d, i) => {
      if (i === swapIdx) return d * placeValues[swapIdx + 1]; // wrong place
      if (i === swapIdx + 1) return d * placeValues[swapIdx]; // wrong place
      return d * placeValues[i];
    });
    const wrongStr = swapped.filter(v => v > 0).sort((a, b) => b - a).join(' + ');

    const options = [
      { letter: 'A', expr: correctStr },
      { letter: 'B', expr: perm1 },
      { letter: 'C', expr: perm2 },
      { letter: 'D', expr: wrongStr },
    ].sort(() => Math.random() - 0.5);

    data = { num, options, initialized: true };
  }
</script>

<div class="worksheet-prob">
  <div class="statement">Four students decompose the number <strong>{data.num}</strong>. Here are the results. <em>One answer is incorrect.</em></div>

  <div class="options-grid">
    {#each data.options as opt}
      <div class="opt-card">
        <span class="opt-letter">{opt.letter}</span>
        <span class="opt-expr">{opt.expr}</span>
      </div>
    {/each}
  </div>

  <div class="question-row">
    Which answer is incorrect? <span class="blank"></span>
  </div>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.5; }
  .statement { padding-left: 0.5rem; margin-bottom: 1.5rem; }
  .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-bottom: 2rem; }
  .opt-card {
    display: flex;
    border: 1.5px solid var(--text-main);
    border-radius: var(--radius-sm);
    overflow: hidden;
  }
  .opt-letter {
    background: var(--bg-color);
    padding: 0.6rem 0.75rem;
    font-weight: 700;
    border-right: 1.5px solid var(--text-main);
  }
  .opt-expr { padding: 0.6rem 0.9rem; font-family: monospace; font-size: 0.95rem; }
  .question-row { display: flex; align-items: center; gap: 0.5rem; padding-left: 0.5rem; margin-top: 1rem; }
  .blank { border-bottom: 2px dotted var(--text-main); display: inline-block; width: 4rem; height: 1.2rem; }
</style>
