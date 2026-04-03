<script lang="ts">
  import ClockFace from '../ui/ClockFace.svelte';
  export let data: any;

  const numberWords = ["twelve", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

  function timeToWords(h: number, m: number, isPm: boolean): string {
    const nextH = (h % 12) + 1;
    let word = "";
    if (m === 0)  word = `${numberWords[h]} o'clock`;
    else if (m === 15) word = `Quarter past ${numberWords[h]}`;
    else if (m === 30) word = `Half past ${numberWords[h]}`;
    else if (m === 45) word = `Quarter to ${numberWords[nextH]}`;
    else if (m === 20) word = `Twenty past ${numberWords[h]}`;
    else if (m === 40) word = `Twenty to ${numberWords[nextH]}`;
    else if (m < 30)   word = `${m} past ${numberWords[h]}`;
    else               word = `${60 - m} to ${numberWords[nextH]}`;

    word = word.charAt(0).toUpperCase() + word.slice(1);

    // Period phrase
    const isAfternoon = isPm && h >= 1 && h <= 5;
    const period = isAfternoon ? "in the afternoon" : isPm ? "in the evening" : "in the morning";
    return `${word} ${period}`;
  }

  if (!data.initialized) {
    const minuteOptions = [0, 15, 20, 30, 45];
    const rows = [];

    for (let i = 0; i < 2; i++) {
      const h   = Math.floor(Math.random() * 12) + 1;
      const m   = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];
      const isPm = Math.random() > 0.5;

      let h24 = h;
      if (isPm && h < 12) h24 += 12;
      if (!isPm && h === 12) h24 = 0;

      const digital = `${h24.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      const spoken  = timeToWords(h, m, isPm);

      // Each row: one clue column (0=spoken, 1=digital, 2=analog), other two are blank
      const clueCol = i % 3; // row 0 -> digital clue, row 1 -> spoken clue — matches screenshot pattern
      // Rotate: map i -> which column is the clue
      const clueColMapped = i === 0 ? 1 : 0; // row 0 gives digital, row 1 gives spoken

      rows.push({ h, m, isPm, digital, spoken, clueCol: clueColMapped });
    }

    data = { rows, initialized: true };
  }
</script>

<div class="worksheet-prob">
  <div class="statement">Complete the following table using the given information.</div>

  <table class="time-table">
    <thead>
      <tr>
        <th>Spoken time, 12-hour</th>
        <th>Digital clock, 24-hour</th>
        <th>Analogue clock</th>
      </tr>
    </thead>
    <tbody>
      {#each data.rows as row}
        <tr>
          <!-- Spoken -->
          <td class="col-spoken">
            {#if row.clueCol === 0}
              {row.spoken}
            {/if}
          </td>

          <!-- Digital -->
          <td class="col-digital">
            {#if row.clueCol === 1}
              <div class="box-dashed filled">{row.digital}</div>
            {:else}
              <div class="box-dashed empty"></div>
            {/if}
          </td>

          <!-- Analogue -->
          <td class="col-analog">
            <!-- Always show clock face; hands only when it's the clue column -->
            <ClockFace h={row.h} m={row.m} size={110} showHands={row.clueCol === 2} />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.5; padding-bottom: 1rem; }
  .statement { font-weight: 600; padding-left: 0.5rem; margin-bottom: 1rem; }

  .time-table { width: 100%; border-collapse: collapse; margin-top: 1rem; text-align: center; }
  .time-table th,
  .time-table td { border: 1.5px solid var(--text-main); padding: 1rem; vertical-align: middle; }
  .time-table th  { font-weight: 600; font-size: 1rem; }

  .col-spoken { width: 35%; font-size: 1.1rem; text-align: center; }
  .col-digital { width: 28%; }
  .col-analog  { width: 37%; }

  .box-dashed {
    display: inline-block;
    border: 3px dashed var(--text-main);
    font-family: monospace;
    letter-spacing: 2px;
  }
  .box-dashed.filled {
    padding: 0.6rem 1.1rem;
    font-size: 1.4rem;
  }
  .box-dashed.empty {
    width: 6rem;
    height: 3.2rem;
  }
</style>
