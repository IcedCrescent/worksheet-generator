<script lang="ts">
  import ClockFace from '../ui/ClockFace.svelte';
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
    word = word.charAt(0).toUpperCase() + word.slice(1);
    return `${word} ${period}`;
  }

  if (!data.initialized) {
    // item a: analog
    let hm1 = Math.floor(Math.random() * 12) * 5; 
    let hh1 = Math.floor(Math.random() * 12) + 1;
    let dm1 = Math.floor(Math.random() * 15) * 5 + 15; 
    let time1Total = (hh1 * 60) + hm1;
    let time2Total = time1Total + dm1;
    let hh2 = Math.floor(time2Total / 60) % 12 || 12;
    let hm2 = time2Total % 60;
    const itemA = { hh1, hm1, hh2, hm2 };
    
    // item b: spoken to digital
    let bh1 = Math.floor(Math.random() * 10) + 1; 
    let bm1 = [10, 15, 20, 30, 45][Math.floor(Math.random() * 5)];
    let bd1 = Math.floor(Math.random() * 60) + 20;
    
    let bTimeTot = (bh1 * 60) + bm1 + bd1;
    let bh2 = Math.floor(bTimeTot / 60) % 12 || 12;
    let bm2 = bTimeTot % 60;
    
    const isMorning = Math.random() > 0.5;
    const bSpoken = timeToWords(bh1, bm1, !isMorning); 
    
    let bhc2 = bh2;
    if (!isMorning && bh2 < 12) bhc2 += 12;
    if (isMorning && bh2 === 12) bhc2 = 0;
    const bDigital = `${bhc2.toString().padStart(2, '0')}:${bm2.toString().padStart(2, '0')}`;
    const itemB = { spoken: bSpoken, digital: bDigital };

    // item c: digital
    let ch1 = Math.floor(Math.random() * 22);
    let cm1 = Math.floor(Math.random() * 40) + 5;
    let cd1 = Math.floor(Math.random() * 45) + 10;
    let cTot = (ch1 * 60) + cm1 + cd1;
    let ch2 = Math.floor(cTot / 60) % 24;
    let cm2 = cTot % 60;
    
    const cd1s = `${ch1.toString().padStart(2, '0')}:${cm1.toString().padStart(2, '0')}`;
    const cd2s = `${ch2.toString().padStart(2, '0')}:${cm2.toString().padStart(2, '0')}`;
    const itemC = { d1: cd1s, d2: cd2s };

    data = { itemA, itemB, itemC, initialized: true };
  }
</script>

<div class="worksheet-prob">
  <div class="statement fw-bold">Write the number of minutes between each of these times.</div>

  <div class="q-row">
    <div class="q-label">a.</div>
    <div class="q-content">
      <div class="clock-pair">
        <ClockFace h={data.itemA.hh1} m={data.itemA.hm1} size={110} />
        <ClockFace h={data.itemA.hh2} m={data.itemA.hm2} size={110} />
      </div>
      <div class="ans-line">............................... minutes</div>
    </div>
  </div>

  <div class="q-row mt-4">
    <div class="q-label">b.</div>
    <div class="q-content align-center">
      <div class="spoken-text">{data.itemB.spoken}</div>
      <div class="digit-box">{data.itemB.digital}</div>
      <div class="ans-line">............................... minutes</div>
    </div>
  </div>
  
  <div class="q-row mt-4">
    <div class="q-label">c.</div>
    <div class="q-content align-center">
      <div class="digit-box large">{data.itemC.d1}</div>
      <div class="digit-box large">{data.itemC.d2}</div>
      <div class="ans-line">............................... minutes</div>
    </div>
  </div>

</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.5; padding-bottom: 2rem; }
  .statement { font-weight: 600; padding-left: 0.5rem; margin-bottom: 2rem; }
  .fw-bold { font-weight: 600; }
  .q-row { display: flex; align-items: flex-start; margin-bottom: 2.5rem; }
  .q-label { font-weight: bold; font-size: 1.25rem; width: 2.5rem; flex-shrink: 0; padding-top: 0.5rem; }
  .q-content { flex-grow: 1; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  .clock-pair { display: flex; gap: 2rem; }
  .align-center { align-items: center; }
  .spoken-text { width: 40%; font-size: 1.2rem; }
  .digit-box { 
    border: 2px solid var(--text-main); 
    padding: 0.5rem 1rem; 
    font-size: 1.25rem; 
    font-family: monospace;
    letter-spacing: 1px;
  }
  .large { padding: 0.75rem 1.5rem; font-size: 1.4rem; letter-spacing: 2px; }
  .ans-line { min-width: 200px; text-align: right; }
</style>
