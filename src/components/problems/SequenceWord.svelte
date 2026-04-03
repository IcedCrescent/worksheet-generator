<script lang="ts">
  export let data: any;

  if (!data.initialized) {
    const names = ['Carlos', 'Maria', 'Liam', 'Emma'];
    const name = names[Math.floor(Math.random() * names.length)];
    const isFemale = name === 'Maria' || name === 'Emma';
    const start = Math.floor(Math.random() * 10) + 5;
    const diff = Math.floor(Math.random() * 5) + 2;
    data = { name, isFemale, start, diff, initialized: true };
  }
</script>

<div class="worksheet-prob">
  <div class="statement">
    {data.name} writes a number sequence. The first term in {data.isFemale ? 'her' : 'his'} sequence is {data.start}.<br><br>
    {data.isFemale ? 'She' : 'He'} uses the term-to-term rule 'subtract {data.diff} from the previous number' to get to the next number. What is the fourth number in {data.isFemale ? 'her' : 'his'} pattern?
    <div class="dotted-block"></div>
  </div>
</div>

<style>
  .worksheet-prob {
    font-size: 1.1rem;
    line-height: 1.6;
  }
  .statement {
    padding-left: 1rem;
  }
  .dotted-block {
    width: 100%;
    border-bottom: 2px dotted var(--text-main);
    height: 2.5rem;
    margin-top: 1rem;
  }
</style>
