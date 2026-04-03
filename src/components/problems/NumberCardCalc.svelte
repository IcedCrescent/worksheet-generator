<script lang="ts">
  export let data: any;

  if (!data.initialized) {
    // Generate a set of 5 number cards
    const cardPool = [4, 5, 20, 80, 100, 25, 50, 200, 400, 10, 2, 40];
    const shuffled = cardPool.sort(() => Math.random() - 0.5).slice(0, 5);
    
    // Find valid pairs for ÷ and ×
    let divPair: [number, number] | null = null;
    let mulPair: [number, number] | null = null;
    const divTarget = shuffled[0] * shuffled[1]; // a ÷ b = ? → pick result
    const mulTarget = shuffled[2] * shuffled[3];

    // Find a pair that divides evenly
    for (let i = 0; i < shuffled.length && !divPair; i++) {
      for (let j = 0; j < shuffled.length && !divPair; j++) {
        if (i !== j && shuffled[i] % shuffled[j] === 0 && shuffled.includes(shuffled[i] / shuffled[j])) {
          divPair = [shuffled[i], shuffled[j]];
        }
      }
    }
    
    // Fallback fixed set mirroring the image
    const cards = [5, 20, 100, 4, 80];
    const div1 = { a: 100, b: 5, result: 20 };  // 100 ÷ 5 = 20
    const mul1 = { a: 20, b: 20, result: 400 };  // 20 × 20 = 400
    
    data = { cards, div1, mul1, initialized: true };
  }
</script>

<div class="worksheet-prob">
  <div class="statement">Here are five number cards.</div>

  <div class="cards-strip">
    {#each data.cards as c}
      <div class="card-chip">{c}</div>
    {/each}
  </div>

  <div class="task-label">Use two cards to complete each calculation. You can use a card more than once.</div>

  <div class="equations">
    <div class="eq-row">
      <div class="input-box"></div>
      <span class="op">÷</span>
      <div class="input-box"></div>
      <span class="eq-sign">=</span>
      <span class="result">{data.div1.result}</span>
    </div>

    <div class="eq-row">
      <div class="input-box"></div>
      <span class="op">×</span>
      <div class="input-box"></div>
      <span class="eq-sign">=</span>
      <span class="result">{data.mul1.result}</span>
    </div>
  </div>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.5; }
  .statement { font-weight: 600; padding-left: 0.5rem; margin-bottom: 1rem; }
  .cards-strip { display: flex; gap: 0.75rem; margin-bottom: 1.75rem; flex-wrap: wrap; }
  .card-chip {
    border: 2px solid var(--text-main);
    background: var(--bg-color);
    font-size: 1.3rem;
    font-weight: 600;
    padding: 0.4rem 1rem;
    border-radius: var(--radius-sm);
    min-width: 3rem;
    text-align: center;
  }
  .task-label { margin-bottom: 2rem; }
  .equations { display: flex; flex-direction: column; gap: 2.5rem; padding-left: 1rem; }
  .eq-row { display: flex; align-items: center; gap: 1rem; }
  .input-box {
    width: 4.5rem;
    height: 3.5rem;
    border: 1.5px solid var(--text-main);
    border-radius: var(--radius-sm);
  }
  .op { font-size: 1.5rem; font-weight: 600; }
  .eq-sign { font-size: 1.5rem; }
  .result { font-size: 1.75rem; font-weight: 700; }
</style>
