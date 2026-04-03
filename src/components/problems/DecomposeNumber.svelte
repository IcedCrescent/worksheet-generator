<script lang="ts">
  export let data: any;
  if (!data.initialized) {
    const num = Math.floor(Math.random() * 9000) + 1000;
    const strNum = num.toString();
    const digitIdx = Math.floor(Math.random() * 4);
    
    data = {
      num,
      targetDigit: strNum[digitIdx],
      initialized: true
    };
  }
</script>

<div class="worksheet-prob">
  <div class="statement">What is the value of...</div>
  
  <div class="sub-problem">
    <span class="letter">a.</span> ...digit <span class="fw-bold">{data.targetDigit}</span> in the number <span class="fw-bold">{data.num}</span>? <span class="dotted-line w-32"></span>
  </div>
  
  <div class="sub-problem mt-4">
    <span class="letter">b.</span> Decompose the number <span class="fw-bold">{data.num}</span>.<br>
    <div class="decompose-row">
      <span class="dotted-line w-32"></span> = <span class="dotted-line w-24"></span> + <span class="dotted-line w-24"></span> + <span class="dotted-line w-24"></span> + <span class="dotted-line w-24"></span>
    </div>
  </div>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.6; }
  .statement { margin-bottom: 1.5rem; padding-left: 0.5rem; }
  .sub-problem { padding-left: 1.5rem; margin-bottom: 1rem; }
  .letter { font-weight: bold; margin-right: 0.5rem; }
  .dotted-line { border-bottom: 2px dotted var(--text-main); display: inline-block; height: 1.2rem; margin: 0 0.25rem; }
  .w-24 { width: 5rem; }
  .w-32 { width: 7rem; }
  .mt-4 { margin-top: 2rem; }
  .fw-bold { font-weight: 500; }
  .decompose-row { margin-top: 1.5rem; padding-left: 1rem; }
</style>
