<script lang="ts">
  import ClockFace from '../ui/ClockFace.svelte';
  export let data: any;

  const numberWords = ["twelve", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

  function timeToWords(h: number, m: number) {
    if (m === 0) return `${numberWords[h]} o'clock`;
    if (m === 15) return `quarter past ${numberWords[h]}`;
    if (m === 30) return `half past ${numberWords[h]}`;
    if (m === 45) return `quarter to ${numberWords[(h % 12) + 1]}`;
    
    // Custom tens
    if (m === 20) return `twenty past ${numberWords[h]}`;
    if (m === 40) return `twenty to ${numberWords[(h % 12) + 1]}`;
    
    if (m < 30) {
      return `${m} past ${numberWords[h]}`;
    } else {
      return `${60 - m} to ${numberWords[(h % 12) + 1]}`;
    }
  }

  function formatDigital(h: number, m: number, p: boolean) {
    const minStr = m.toString().padStart(2, '0');
    return `${h}:${minStr} ${p ? 'p.m.' : 'a.m.'}`;
  }

  function format24(h: number, m: number, p: boolean) {
    let hour24 = h;
    if (p && h < 12) hour24 += 12;
    if (!p && h === 12) hour24 = 0;
    return `${hour24.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  if (!data.initialized) {
    const h = Math.floor(Math.random() * 12) + 1;
    const possibleMins = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const m = possibleMins[Math.floor(Math.random() * possibleMins.length)];
    const isPm = Math.random() > 0.5;

    // Angles
    const hourAngle = (h % 12) * 30 + (m / 60) * 30;
    const minuteAngle = (m / 5) * 30;

    let correct1 = timeToWords(h, m);
    let correct2 = Math.random() > 0.5 ? format24(h, m, isPm) : formatDigital(h, m, isPm);
    
    // Fakes
    let fake1 = timeToWords((h % 12) + 1, m);
    let fake2 = Math.random() > 0.5 
      ? formatDigital((h % 12) + 1, m, !isPm)
      : format24(h, (m + 15) % 60, isPm);

    let swappedHour = m / 5 === 0 ? 12 : m / 5;
    let swappedMin = (h * 5) % 60;
    let fake3 = formatDigital(swappedHour, swappedMin, isPm);
    
    // Alternate wording logic
    if (m === 20 && Math.random() > 0.5) correct1 = `${numberWords[h]} twenty`;
    if (m === 40 && Math.random() > 0.5) correct1 = `twenty to ${numberWords[(h % 12) + 1]}`;

    let answers = [correct1, correct2, fake1, fake2, fake3];
    answers.sort(() => Math.random() - 0.5);

    data = { h, m, hourAngle, minuteAngle, answers, initialized: true };
  }

  const ticks = Array.from({ length: 60 });
</script>

<div class="worksheet-prob">
  <div class="statement">Look at a wall clock.</div>
  
  <div class="clock-container">
    <ClockFace h={data.h} m={data.m} size={150} />
  </div>
  
  <div class="statement text-center" style="margin-top: 1.5rem; margin-bottom: 2rem;">
    Draw a RING around ALL the times that are equivalent to the shown time.
  </div>

  <div class="options">
    {#each data.answers as ans}
      <span class="ans-opt">{ans}</span>
    {/each}
  </div>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.5; padding-bottom: 1rem; }
  .statement { font-weight: 600; padding-left: 0.5rem; }
  .text-center { text-align: center; }
  .clock-container { display: flex; justify-content: center; margin-top: 2rem; margin-bottom: 1rem; }
  .options { 
    display: flex; 
    justify-content: space-around; 
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 1.5rem; 
    font-size: 1.15rem; 
    padding: 0 1rem; 
  }
  .ans-opt {
    padding: 0.25rem 0.5rem;
    border: 1px dotted transparent;
  }
</style>
