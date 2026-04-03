<script lang="ts">
  export let data: any;

  if (!data.initialized) {
    // Pick a base number (2-3 digits), generate 4 similar word-label cards
    const base = Math.floor(Math.random() * 9) + 2; // 2-9
    const tens = base * 10;
    const hundreds = base * 100;
    const offset = Math.floor(Math.random() * 8) + 1;

    // 4 cards: base*100+offset, base*100+offset*10, base*10+offset, base+offset
    const numToWords = (n: number) => {
      // Simple English words for 2-3 digit numbers
      const hundreds = Math.floor(n / 100);
      const remainder = n % 100;
      const tens = Math.floor(remainder / 10);
      const ones = remainder % 10;
      const w = ['zero','one','two','three','four','five','six','seven','eight','nine','ten',
                 'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
      const tw = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
      let result = '';
      if (hundreds > 0) result += w[hundreds] + ' hundred';
      if (remainder === 0) return result;
      const sep = hundreds > 0 ? ' and ' : '';
      if (remainder < 20) return result + sep + w[remainder];
      return result + sep + tw[tens] + (ones > 0 ? '-' + w[ones] : '');
    };

    const cards = [
      { letter: 'A', num: hundreds + offset * 10, label: '' },
      { letter: 'B', num: hundreds + offset,       label: '' },
      { letter: 'C', num: hundreds + tens,          label: '' },
      { letter: 'D', num: tens + offset,            label: '' },
    ];
    cards.forEach(c => { c.label = numToWords(c.num).replace(/^./, s => s.toUpperCase()); });

    // Build 6 calculations that result in one of the card values
    const ops = [
      { expr: `${tens + offset} × 10`,    ans: (tens + offset) * 10 },
      { expr: `${(hundreds + offset) * 10} ÷ 10`, ans: hundreds + offset },
      { expr: `${(hundreds + tens) * 100} ÷ 100`, ans: hundreds + tens },
      { expr: `${tens + offset} × 10`,    ans: (tens + offset) * 10 },
      { expr: `${(hundreds + offset * 10)} ÷ 10`, ans: (hundreds + offset * 10) / 10 },
      { expr: `${(hundreds + offset) * 100} ÷ 100`, ans: hundreds + offset },
    ];
    // label each with correct card letter
    const opsLabelled = ops.map(o => ({
      ...o,
      card: cards.find(c => c.num === o.ans)?.letter ?? '?'
    }));

    // Build simpler clean set
    const questions = [
      { label: 'a', expr: `${cards[3].num} × 10`,    ans: cards[0].letter },
      { label: 'b', expr: `${cards[0].num * 10} ÷ 10`, ans: cards[0].letter },
      { label: 'c', expr: `${cards[2].num * 100} ÷ 100`, ans: cards[2].letter },
      { label: 'd', expr: `${cards[3].num} × 10`,    ans: cards[0].letter },
      { label: 'e', expr: `${cards[0].num} ÷ 10`,    ans: cards[3].letter },
      { label: 'f', expr: `${cards[2].num * 10} ÷ 10`, ans: cards[2].letter },
    ];

    data = { cards, questions, initialized: true };
  }
</script>

<div class="worksheet-prob">
  <div class="statement">Here are four number cards.</div>

  <div class="cards-grid">
    {#each data.cards as card}
      <div class="card">
        <span class="card-letter">{card.letter}</span>
        <span class="card-label">{card.label}</span>
      </div>
    {/each}
  </div>

  <div class="task-label">Write the letter of the card that is the answer to:</div>

  <div class="questions-grid">
    {#each data.questions as q}
      <div class="q-item">
        <span class="q-letter">{q.label}.</span>
        <span class="q-expr">{q.expr} =</span>
        <span class="blank"></span>
      </div>
    {/each}
  </div>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.5; }
  .statement { font-weight: 600; padding-left: 0.5rem; margin-bottom: 1rem; }
  .cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 2rem; }
  .card {
    display: flex;
    border: 1.5px solid var(--text-main);
    border-radius: var(--radius-sm);
    overflow: hidden;
  }
  .card-letter {
    background: var(--text-main);
    color: white;
    padding: 0.5rem 0.75rem;
    font-weight: 700;
  }
  .card-label {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
  .task-label { margin-bottom: 1rem; }
  .questions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem 2rem; padding-left: 0.5rem; }
  .q-item { display: flex; align-items: center; gap: 0.4rem; }
  .q-letter { font-weight: bold; }
  .blank { border-bottom: 2px dotted var(--text-main); display: inline-block; width: 3.5rem; height: 1.2rem; }
</style>
