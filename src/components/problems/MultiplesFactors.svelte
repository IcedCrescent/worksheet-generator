<script lang="ts">
  export let data: any;

  function getFactors(n: number): number[] {
    const factors: number[] = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        factors.push(i);
        if (i !== n / i) factors.push(n / i);
      }
    }
    return factors.sort((a, b) => a - b);
  }

  function getCommonFactors(a: number, b: number): number[] {
    const fa = new Set(getFactors(a));
    return getFactors(b).filter(f => fa.has(f));
  }

  if (!data.initialized) {
    // Choose two numbers with interesting common factors
    const pairs = [[20, 24], [18, 30], [36, 48], [24, 36], [12, 30], [16, 40], [15, 25], [28, 42]];
    const [numA, numB] = pairs[Math.floor(Math.random() * pairs.length)];
    const allFactors = getFactors(numA);
    const commonFactors = getCommonFactors(numA, numB);
    
    // Generate distractors (non-common-factors that look plausible)
    const distractors: number[] = getFactors(numB)
      .filter(f => !commonFactors.includes(f))
      .slice(0, 3);
    
    // Ensure we also have non-common numbers
    const extras = [7, 11, 13, 14, 6].filter(n => !commonFactors.includes(n) && !distractors.includes(n));
    const allOptions = [...commonFactors, ...distractors, ...extras.slice(0, 2)].sort(() => Math.random() - 0.5);
    
    data = { numA, numB, allOptions, commonFactors, initialized: true };
  }
</script>

<div class="worksheet-prob">
  <div class="section">
    <span class="letter">a.</span>
    <div class="section-body">
      <div>Find all factor pairs of <strong>{data.numA}</strong>.</div>
      <div class="factor-pairs">
        {#each Array(6) as _, i}
          <div class="factor-row">
            <span class="blank sm"></span> × <span class="blank sm"></span> = {data.numA}
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <div class="section" style="margin-top: 2rem;">
    <span class="letter">b.</span>
    <div class="section-body">
      <div>Circle the common factor(s) for <strong>{data.numA}</strong> and <strong>{data.numB}</strong>.</div>
      <div class="options">
        {#each data.allOptions as opt}
          <span class="opt-chip">{opt}</span>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.5; }
  .section { display: flex; gap: 0.5rem; align-items: flex-start; }
  .section-body { flex-grow: 1; }
  .letter { font-weight: bold; font-size: 1.1rem; min-width: 1.5rem; padding-top: 0.1rem; flex-shrink: 0; }
  .factor-pairs { display: flex; gap: 1rem 3rem; flex-wrap: wrap; margin-top: 1.5rem; padding-left: 0.5rem; }
  .factor-row { display: flex; align-items: center; gap: 0.5rem; font-size: 1.1rem; }
  .blank { 
    display: inline-block; 
    border-bottom: 2px dotted var(--text-main); 
    height: 1.2rem; 
  }
  .sm { width: 3rem; }
  .options {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 2rem;
    margin-top: 1.5rem;
    padding: 1rem 1.5rem;
  }
  .opt-chip {
    font-size: 1.25rem;
    font-weight: 500;
    padding: 0.35rem 0.75rem;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    min-width: 3rem;
    text-align: center;
  }
</style>
