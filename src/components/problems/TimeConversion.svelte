<script lang="ts">
  export let data: any;

  if (!data.initialized) {
    const days = Math.floor(Math.random() * 6) + 1;
    const hrs = Math.floor(Math.random() * 23);
    const mins = (Math.floor(Math.random() * 11) + 1) * 10; // multiples of 10
    const secs = mins * 60;
    const wks = Math.floor(Math.random() * 8) + 2;
    const days2 = wks * 7;

    data = { days, hrs, mins, secs, wks, days2, initialized: true };
  }
</script>

<div class="worksheet-prob">
  <div class="statement">Convert the following.</div>

  <div class="subs">
    <div class="sub">
      <span class="letter">a.</span>
      <span class="q-text">{data.days} {data.days === 1 ? 'day' : 'days'} {data.hrs} {data.hrs === 1 ? 'hour' : 'hours'} = <span class="blank"></span> hours</span>
    </div>
    <div class="sub">
      <span class="letter">b.</span>
      <span class="q-text">{data.days2 / 7 * 24 + data.hrs} minutes = <span class="blank"></span> hours</span>
    </div>
    <div class="sub">
      <span class="letter">c.</span>
      <span class="q-text">{data.mins} minutes = <span class="blank"></span> seconds</span>
    </div>
    <div class="sub">
      <span class="letter">d.</span>
      <span class="q-text">{data.days2} days = <span class="blank"></span> weeks</span>
    </div>
  </div>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.6; }
  .statement { font-weight: 600; padding-left: 0.5rem; margin-bottom: 1.5rem; }
  .subs { display: flex; flex-direction: column; gap: 1.75rem; padding-left: 1.5rem; }
  .sub { display: flex; align-items: center; gap: 0.5rem; }
  .letter { font-weight: bold; min-width: 1.5rem; flex-shrink: 0; }
  .q-text { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; }
  .blank {
    display: inline-block;
    border-bottom: 2px dotted var(--text-main);
    width: 5rem;
    height: 1.2rem;
    margin: 0 0.2rem;
  }
</style>
