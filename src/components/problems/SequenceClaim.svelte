<script lang="ts">
  export let data: any;

  if (!data.initialized) {
    const start = -(Math.floor(Math.random() * 20) + 10); // e.g. -22
    const step  = (Math.floor(Math.random() * 4) + 2) * (Math.random() > 0.5 ? 1 : -1);
    // Pick a claim that is or isn't reachable
    const claimCorrect = Math.random() > 0.5;
    let target: number;
    if (claimCorrect) {
      // jump some steps and land exactly
      const steps = Math.floor(Math.random() * 10) + 5;
      target = start + step * steps;
    } else {
      // off by one from the sequence
      const steps = Math.floor(Math.random() * 10) + 5;
      target = start + step * steps + (step > 0 ? 1 : -1);
    }
    const names = ['Trong Anh', 'Maria', 'James', 'Anh Tú', 'Sam'];
    const name  = names[Math.floor(Math.random() * names.length)];
    data = { start, step, target, name, initialized: true };
  }
</script>

<div class="worksheet-prob">
  <div class="statement">
    {data.name} counts on in {data.step > 0 ? `groups of ${data.step}` : `${Math.abs(data.step)}s going backwards`} starting at {data.start}.
  </div>

  <div class="claim">
    {data.name} says: <em>"If I start at {data.start} and keep {data.step > 0 ? 'adding' : 'subtracting'} {Math.abs(data.step)}, I will reach {data.target}."</em>
  </div>

  <div class="question">Is {data.name} correct? Explain your answer.</div>

  <div class="lines">
    <div class="dotted-line"></div>
    <div class="dotted-line"></div>
    <div class="dotted-line"></div>
  </div>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.6; }
  .statement { font-weight: 600; padding-left: 0.5rem; margin-bottom: 1rem; }
  .claim { padding-left: 1.5rem; margin-bottom: 1rem; font-size: 1.1rem; }
  .question { padding-left: 0.5rem; margin-bottom: 1.5rem; }
  .lines { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem; }
  .dotted-line { border-bottom: 1.5px dotted var(--text-main); width: 100%; }
</style>
