<script lang="ts">
  export let data: any;
  if (!data.initialized) {
    const hours = Math.floor(Math.random() * 8) + 1;
    const minutes = Math.floor(Math.random() * 50) + 10;
    
    data = {
      hours,
      minutes,
      durationMins: Math.floor(Math.random() * 45) + 15,
      name: ['Ms. Hoa', 'Mr. Smith', 'Anna', 'David'][Math.floor(Math.random() * 4)],
      destination: ['library', 'station', 'school', 'park'][Math.floor(Math.random() * 4)],
      mode: ['walk', 'ride her bike', 'drive'][Math.floor(Math.random() * 3)],
      initialized: true
    };
  }
</script>

<div class="worksheet-prob">
  <div class="statement">
    {data.name} leaves home at {data.hours}:{data.minutes} p.m. It takes {data.durationMins} minutes to {data.mode} to the {data.destination}.<br>
    What time does {data.name.includes('Ms') || data.name === 'Anna' ? 'she' : 'he'} arrive at the {data.destination}?
    <div class="dotted-block"></div>
  </div>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.6; }
  .statement { padding-left: 0.5rem; }
  .dotted-block { width: 60%; border-bottom: 2px dotted var(--text-main); height: 2.5rem; margin-top: 1rem; margin-bottom: 1rem; }
</style>
