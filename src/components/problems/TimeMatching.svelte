<script lang="ts">
  export let data: any;

  const numberWords = ["twelve", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
  function timeToWords(h: number, m: number, p: boolean) {
    const period = p ? "in the evening" : "in the morning";
    if (p && h >= 1 && h <= 5) return timeToWordsWithPeriod(h, m, "in the afternoon");
    return timeToWordsWithPeriod(h, m, period);
  }

  function timeToWordsWithPeriod(h: number, m: number, period: string) {
    let word = "";
    if (m === 0) word = `${numberWords[h]} o'clock`;
    else if (m === 15) word = `Quarter past ${numberWords[h]}`;
    else if (m === 30) word = `Half past ${numberWords[h]}`;
    else if (m === 45) word = `Quarter to ${numberWords[(h % 12) + 1]}`;
    else if (m === 20) word = `Twenty past ${numberWords[h]}`;
    else if (m === 40) word = `Twenty to ${numberWords[(h % 12) + 1]}`;
    else if (m < 30) word = `${m} past ${numberWords[h]}`;
    else word = `${60 - m} to ${numberWords[(h % 12) + 1]}`;
    
    // Capitalize first letter
    word = word.charAt(0).toUpperCase() + word.slice(1);
    return `${word} ${period}`;
  }

  if (!data.initialized) {
    const pairs = [];
    for(let i=0; i<4; i++) {
       const h = Math.floor(Math.random() * 12) + 1;
       const m = [0, 15, 30, 45, 20][Math.floor(Math.random() * 5)];
       const isPm = Math.random() > 0.5;
       
       let h24 = h;
       if (isPm && h < 12) h24 += 12;
       if (!isPm && h === 12) h24 = 0;
       
       const digital = `${h24.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
       const spoken = timeToWords(h, m, isPm);
       pairs.push({ spoken, digital });
    }
    
    // Add one blank spoken with an existing extra digital
    const hExtra = Math.floor(Math.random() * 12) + 1;
    let h24e = hExtra;
    if (hExtra < 12) h24e += 12; // fake afternoon
    const digitalExtra = `${h24e.toString().padStart(2, '0')}:15`;
    pairs.push({ spoken: null, digital: digitalExtra });
    
    const digitalList = pairs.map(p => p.digital).sort(() => Math.random() - 0.5);
    
    data = { pairs, digitalList, initialized: true };
  }
</script>

<div class="worksheet-prob">
  <div class="statement fw-bold">Match the times to the digital clock.</div>
  
  <div class="matching-container">
    <div class="col-phrase">
      <div class="col-title">Time</div>
      {#each data.pairs as p}
        <div class="phrase-item">
          {#if p.spoken}
            {p.spoken}
          {:else}
            <span class="dotted-line"></span>
          {/if}
        </div>
      {/each}
    </div>
    <div class="col-digit">
      <div class="col-title text-center">Digital clock</div>
      {#each data.digitalList as d}
        <div class="digit-box">{d}</div>
      {/each}
    </div>
  </div>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.5; padding-bottom: 1rem; }
  .statement { font-weight: 600; padding-left: 0.5rem; margin-bottom: 2rem; }
  .matching-container { display: flex; justify-content: space-between; padding: 0 1rem; }
  .col-phrase { width: 55%; }
  .col-digit { width: 35%; display: flex; flex-direction: column; align-items: flex-end; }
  .col-title { font-weight: 600; margin-bottom: 1.5rem; }
  .text-center { text-align: center; width: 100%; right: 1rem; position: relative;}
  .phrase-item { margin-bottom: 2.75rem; min-height: 2rem; display: flex; align-items: center; font-size: 1.15rem;}
  .digit-box { 
    border: 3px dashed var(--text-main); 
    padding: 0.75rem 1.5rem; 
    font-size: 1.25rem; 
    letter-spacing: 2px;
    font-family: monospace; 
    margin-bottom: 1.5rem;
  }
  .dotted-line { border-bottom: 2px dotted var(--text-main); display: inline-block; width: 100%; height: 1.2rem; }
</style>
