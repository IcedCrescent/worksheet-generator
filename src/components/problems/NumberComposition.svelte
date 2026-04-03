<script lang="ts">
  export let data: any;

  if (!data.initialized) {
    // Build a 5-digit number
    const target = Math.floor(Math.random() * 90000) + 10000;
    
    // Decompose into true place-value parts
    const tenThousands = Math.floor(target / 10000) * 10000;
    const thousands = Math.floor((target % 10000) / 1000) * 1000;
    const hundreds = Math.floor((target % 1000) / 100) * 100;
    const tens = Math.floor((target % 100) / 10) * 10;
    const ones = target % 10;
    
    const trueParts = [tenThousands, thousands, hundreds, tens, ones].filter(n => n > 0);
    
    // Generate 4–5 distractors
    const distractors: number[] = [];
    while (distractors.length < 4) {
      const fake = [10000, 1000, 100, 10, 1, 20000, 5000, 200, 30, 7][Math.floor(Math.random() * 10)];
      if (!trueParts.includes(fake) && !distractors.includes(fake)) {
        distractors.push(fake);
      }
    }
    
    // Combine and shuffle
    const allOptions = [...trueParts, ...distractors].sort(() => Math.random() - 0.5);
    
    data = { target, allOptions, initialized: true };
  }
</script>

<div class="worksheet-prob">
  <div class="statement">Circle all the numbers that are needed to make <strong>{data.target}</strong>.</div>

  <div class="options">
    {#each data.allOptions as opt}
      <span class="opt-chip">{opt}</span>
    {/each}
  </div>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.5; }
  .statement { padding-left: 0.5rem; margin-bottom: 2rem; }
  .options {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem 3rem;
    padding: 1.5rem 2rem;
    justify-content: space-around;
  }
  .opt-chip {
    font-size: 1.25rem;
    font-weight: 500;
    padding: 0.35rem 0.75rem;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    min-width: 3.5rem;
    text-align: center;
  }
</style>
