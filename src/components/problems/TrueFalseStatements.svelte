<script lang="ts">
  export let data: any;

  if (!data.initialized) {
    const stmts = [
      { text: `The digit 5 is in the thousands place in ${Math.floor(Math.random() * 90) + 10}5${Math.floor(Math.random() * 900) + 100}.`, fake: `The digit 5 is in the thousands place in 5${Math.floor(Math.random() * 90) + 10}${Math.floor(Math.random() * 900) + 100}.` },
      { text: `8 tens = 80 ones.`, fake: `8 tens = 800 ones.` },
      { text: `The value of digit 4 in 92428 is hundreds.`, fake: `The value of digit 4 in 92428 is thousands.` }
    ];
    
    // Pick 3 random, some true some false
    data = {
      questions: stmts.map(s => Math.random() > 0.5 ? s.text : s.fake),
      initialized: true
    };
  }
</script>

<div class="worksheet-prob">
  <div class="statement">Write <strong>T</strong> if the statement is true and <strong>F</strong> if the statement is false in the boxes.</div>
  
  {#each data.questions as q, i}
    <div class="sub-problem">
      <span class="letter">{String.fromCharCode(97 + i)}.</span> {q} 
      <span class="stretch"></span>
      <span class="tf-box">[ &nbsp;&nbsp;&nbsp; ]</span>
    </div>
  {/each}
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.6; }
  .statement { margin-bottom: 1rem; padding-left: 0.5rem; }
  .sub-problem { display: flex; align-items: baseline; margin-bottom: 1.25rem; padding-left: 1.5rem; }
  .letter { font-weight: bold; margin-right: 0.5rem; }
  .stretch { flex-grow: 1; border-bottom: 1px dotted transparent; margin: 0 1rem; }
  .tf-box { font-family: monospace; font-size: 1.2rem; white-space: nowrap; }
</style>
