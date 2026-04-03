<script lang="ts">
  export let data: any;

  if (!data.initialized) {
    const diff = Math.floor(Math.random() * 5) + 2; // Add 2 to 6
    const start = Math.floor(Math.random() * 10) + 1; // 1 to 10
    const sequence = Array.from({length: 5}, (_, i) => start + i * diff);
    
    const options = [
      start + 5 * diff, // in sequence
      start + 5 * diff + 1, // not
      start + 8 * diff, // in sequence
      start + 9 * diff + 2 // not
    ].sort((a,b) => a - b);

    const names = ['Nina', 'Tom', 'Sarah', 'Leo'];
    const name = names[Math.floor(Math.random() * names.length)];
    const isFemale = name === 'Nina' || name === 'Sarah';
    
    data = { diff, start, sequence, options, name, isFemale, initialized: true };
  }
</script>

<div class="worksheet-prob">
  <div class="statement">
    The rule for a sequence of numbers is 'add {data.diff}' each time.<br>
    <div class="seq-center">{data.sequence.join(', ')}, ...</div>
  </div>
  
  <div class="sub-problem">
    <span class="letter">a.</span> Is the sequence linear or non-linear? <span class="dotted-line w-32"></span>
  </div>
  
  <div class="sub-problem">
    <span class="letter">b.</span> The sequence continues the same way. Circle the numbers that are NOT in the sequence:
    <div class="options-row">
      {#each data.options as opt}
        <span class="option-num">{opt}</span>
      {/each}
    </div>
  </div>
  
  <div class="sub-problem">
    <span class="letter">c.</span> {data.name} says: "All the terms in the sequence are 1 less than a multiple of {data.diff + 1}." Is {data.isFemale ? 'she' : 'he'} correct? Explain your answer.
    <div class="dotted-block"></div>
    <div class="dotted-block"></div>
  </div>
</div>

<style>
  .worksheet-prob {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  .statement {
    margin-bottom: 1rem;
  }
  .seq-center {
    text-align: center;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    letter-spacing: 2px;
  }
  .sub-problem {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 1rem;
    padding-left: 1rem;
  }
  .letter {
    font-weight: bold;
    margin-right: 0.5rem;
  }
  .dotted-line {
    border-bottom: 2px dotted var(--text-main);
    display: inline-block;
    height: 1.5rem;
    margin-left: 0.5rem;
  }
  .w-32 {
    width: 8rem;
  }
  .dotted-block {
    width: 100%;
    border-bottom: 2px dotted var(--text-main);
    height: 2.5rem;
    margin-top: 0.5rem;
  }
  .options-row {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 1.5rem 4rem;
  }
  .option-num {
    font-size: 1.2rem;
  }
</style>
