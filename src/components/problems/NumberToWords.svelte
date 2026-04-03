<script lang="ts">
  export let data: any;

  if (!data.initialized) {
    data = {
      num1: Math.floor(Math.random() * 9000) + 1000,
      num2: Math.floor(Math.random() * 90000) + 10000,
      initialized: true
    };
  }
</script>

<div class="worksheet-prob">
  <div class="title">Write the number in words:</div>
  <div class="sub-problem">
    <span class="letter">a.</span> <span class="fw-bold">{data.num1}:</span> <span class="dotted-line stretch"></span>
  </div>
  <div class="sub-problem">
    <span class="letter">b.</span> <span class="fw-bold">{data.num2}:</span> <span class="dotted-line stretch"></span>
  </div>
</div>

<style>
  .worksheet-prob {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  .title {
    margin-bottom: 1rem;
  }
  .sub-problem {
    display: flex;
    align-items: flex-end;
    margin-bottom: 1.5rem;
    padding-left: 1rem;
  }
  .letter {
    font-weight: bold;
    margin-right: 0.5rem;
  }
  .fw-bold {
    font-weight: 500;
  }
  .dotted-line {
    border-bottom: 2px dotted var(--text-main);
    display: inline-block;
    height: 1.5rem;
    margin-left: 0.5rem;
  }
  .stretch {
    flex-grow: 1;
  }
</style>
