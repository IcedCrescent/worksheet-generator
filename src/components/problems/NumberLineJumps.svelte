<script lang="ts">
  export let data: any;
  if (!data.initialized) {
    data = {
      start1: Math.floor(Math.random() * 20) - 10,
      countOn: Math.floor(Math.random() * 8) + 1,
      start2: Math.floor(Math.random() * 20) - 10,
      countBack: Math.floor(Math.random() * 8) + 1,
      initialized: true
    };
  }
</script>

<div class="worksheet-prob">
  <div class="statement">Write where you would land on the number line after these moves.</div>
  
  <div class="sub-problem bullet-list">
    <div class="bullet-item">• Start at <span class="fw-bold">{data.start1}</span>. Then count on <span class="fw-bold">{data.countOn}</span>. You land at <span class="dotted-line w-16"></span>.</div>
    <div class="bullet-item">• Start at <span class="fw-bold">{data.start2}</span>. Then count back <span class="fw-bold">{data.countBack}</span>. You land at <span class="dotted-line w-16"></span>.</div>
  </div>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.6; }
  .statement { margin-bottom: 1.5rem; padding-left: 0.5rem; }
  .bullet-list { padding-left: 2rem; }
  .bullet-item { margin-bottom: 1.5rem; position: relative; }
  .dotted-line { border-bottom: 2px dotted var(--text-main); display: inline-block; height: 1.2rem; margin: 0 0.25rem; }
  .w-16 { width: 4rem; }
  .fw-bold { font-weight: 500; }
</style>
