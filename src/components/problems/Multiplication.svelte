<script lang="ts">
  export let data: any;

  if (!data.initialized) {
    data = {
      a1: Math.floor(Math.random() * 90) + 10,
      a2: 100,
      b1: (Math.floor(Math.random() * 900) + 100) * 100,
      b2: 100,
      c2: 10,
      cRes: (Math.floor(Math.random() * 900) + 100) * 100,
      d1: Math.floor(Math.random() * 900) + 100,
      dResMultiplier: 10,
      initialized: true
    };
  }
</script>

<div class="worksheet-prob">
  <div class="title">Complete the number sentences.</div>
  
  <div class="grid-layout">
    <div class="sub-problem">
      <span class="letter">a.</span> {data.a1} &times; {data.a2} = <span class="dotted-line line-small"></span>
    </div>
    <div class="sub-problem">
      <span class="letter">b.</span> {data.b1} &divide; {data.b2} = <span class="dotted-line line-small"></span>
    </div>
    <div class="sub-problem">
      <span class="letter">c.</span> <span class="dotted-line line-small"></span> &divide; {data.c2} = {data.cRes}
    </div>
    <div class="sub-problem">
      <span class="letter">d.</span> {data.d1} &times; <span class="dotted-line line-small"></span> = {data.d1 * data.dResMultiplier}
    </div>
  </div>
</div>

<style>
  .worksheet-prob {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  .title {
    margin-bottom: 1.5rem;
  }
  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem 3rem;
    padding-left: 1rem;
  }
  .sub-problem {
    display: flex;
    align-items: flex-end;
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
  .line-small {
    width: 6rem;
  }
</style>
