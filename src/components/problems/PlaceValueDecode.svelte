<script lang="ts">
  export let data: any;

  const places = ['ten thousands', 'thousands', 'hundreds', 'tens', 'ones'];
  const placeValues = [10000, 1000, 100, 10, 1];

  if (!data.initialized) {
    // Build a 5-digit number
    const digits = Array.from({ length: 5 }, () => Math.floor(Math.random() * 9) + 1);
    const number = digits.reduce((acc, d, i) => acc + d * placeValues[i], 0);
    // Create shuffled clues
    const clues = places.map((p, i) => ({ digit: digits[i], place: p }))
                        .sort(() => Math.random() - 0.5);
    const names = ['Vincent', 'Maria', 'Lena', 'Omar', 'Priya'];
    const name = names[Math.floor(Math.random() * names.length)];
    data = { number, clues, name, initialized: true };
  }
</script>

<div class="worksheet-prob">
  <div class="statement">{data.name}'s password is a 5-digit number.</div>

  <div class="clues">
    {#each data.clues as c}
      <div class="clue-row">
        <span class="digit-badge">{c.digit}</span> is in the <strong>{c.place}</strong> place.
      </div>
    {/each}
  </div>

  <div class="answer-row">
    {data.name}'s password is: <span class="dotted-line"></span>
  </div>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.6; }
  .statement { font-weight: 600; padding-left: 0.5rem; margin-bottom: 1.25rem; }
  .clues { padding-left: 2rem; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem; }
  .clue-row { font-size: 1.1rem; }
  .digit-badge { font-weight: 700; font-size: 1.2rem; margin-right: 0.25rem; }
  .answer-row { display: flex; align-items: baseline; gap: 0.5rem; padding-left: 0.5rem; margin-top: 1rem; }
  .dotted-line { border-bottom: 2px dotted var(--text-main); display: inline-block; width: 8rem; height: 1.2rem; margin-left: 0.5rem; }
</style>
