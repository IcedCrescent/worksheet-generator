<script lang="ts">
  import { dndzone, type DndEvent } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { worksheetBlocks, type WorksheetBlock } from "../lib/store";

  import SequenceAnalysis from "./problems/SequenceAnalysis.svelte";
  import NumberToWords from "./problems/NumberToWords.svelte";
  import SequenceWord from "./problems/SequenceWord.svelte";
  import Multiplication from "./problems/Multiplication.svelte";
  import TrueFalseStatements from "./problems/TrueFalseStatements.svelte";
  import NumberLineJumps from "./problems/NumberLineJumps.svelte";
  import TimeDuration from "./problems/TimeDuration.svelte";
  import DecomposeNumber from "./problems/DecomposeNumber.svelte";
  import ProbabilityBag from "./problems/ProbabilityBag.svelte";
  import AnalogClockProblem from "./problems/AnalogClockProblem.svelte";
  import TimeTable from "./problems/TimeTable.svelte";
  import TimeMatching from "./problems/TimeMatching.svelte";
  import TimeDifference from "./problems/TimeDifference.svelte";
  import TimeConversion from "./problems/TimeConversion.svelte";
  import NumberComposition from "./problems/NumberComposition.svelte";
  import MultiplesFactors from "./problems/MultiplesFactors.svelte";
  import OrderNumberLine from "./problems/OrderNumberLine.svelte";
  import SequenceClaim from "./problems/SequenceClaim.svelte";
  import PlaceValueDecode from "./problems/PlaceValueDecode.svelte";
  import MathFlowDiagram from "./problems/MathFlowDiagram.svelte";
  import NumberCardMatch from "./problems/NumberCardMatch.svelte";
  import FindIncorrectDecomposition from "./problems/FindIncorrectDecomposition.svelte";
  import NumberCardCalc from "./problems/NumberCardCalc.svelte";

  const flipDurationMs = 200;

  function handleDndConsider(e: CustomEvent<DndEvent<WorksheetBlock>>) {
    worksheetBlocks.set(e.detail.items);
  }

  function handleDndFinalize(e: CustomEvent<DndEvent<WorksheetBlock>>) {
    worksheetBlocks.set(e.detail.items);
  }

  function removeBlock(id: string) {
    worksheetBlocks.update((blocks) => blocks.filter((b) => b.id !== id));
  }
</script>

<div class="worksheet-page">
  <div class="worksheet-header">
    <div class="header-row">
      <div class="field">Name: <span class="dotted-line"></span></div>
      <div class="field">Class: <span class="dotted-line"></span></div>
      <div class="field">Date: <span class="dotted-line"></span></div>
    </div>
    <div class="title-row">
      <h2>REVISION WORKSHEET</h2>
    </div>
  </div>

  <section
    class="dnd-zone"
    use:dndzone={{
      items: $worksheetBlocks,
      flipDurationMs,
      dropTargetStyle: { outline: "2px dashed var(--accent)" },
    }}
    on:consider={handleDndConsider}
    on:finalize={handleDndFinalize}
  >
    {#each $worksheetBlocks as block, index (block.id)}
      <div
        class="problem-wrapper problem-block"
        animate:flip={{ duration: flipDurationMs }}
      >
        <div class="block-controls problem-block-controls no-print">
          <span class="drag-handle">✋ Drag to move</span>
          <button class="remove-btn" on:click={() => removeBlock(block.id)}
            >✕</button
          >
        </div>

        <div class="problem-content">
          <div class="problem-number">{index + 1}.</div>
          <div class="problem-body">
            {#if block.type === "sequence-analysis"}
              <SequenceAnalysis bind:data={block.data} />
            {:else if block.type === "number-to-words"}
              <NumberToWords bind:data={block.data} />
            {:else if block.type === "sequence-word"}
              <SequenceWord bind:data={block.data} />
            {:else if block.type === "multiplication"}
              <Multiplication bind:data={block.data} />
            {:else if block.type === "true-false"}
              <TrueFalseStatements bind:data={block.data} />
            {:else if block.type === "number-line-jumps"}
              <NumberLineJumps bind:data={block.data} />
            {:else if block.type === "time-duration"}
              <TimeDuration bind:data={block.data} />
            {:else if block.type === "decompose-number"}
              <DecomposeNumber bind:data={block.data} />
            {:else if block.type === "probability-bag"}
              <ProbabilityBag bind:data={block.data} />
            {:else if block.type === "analog-clock"}
              <AnalogClockProblem bind:data={block.data} />
            {:else if block.type === "time-table"}
              <TimeTable bind:data={block.data} />
            {:else if block.type === "time-matching"}
              <TimeMatching bind:data={block.data} />
            {:else if block.type === "time-difference"}
              <TimeDifference bind:data={block.data} />
            {:else if block.type === "time-conversion"}
              <TimeConversion bind:data={block.data} />
            {:else if block.type === "number-composition"}
              <NumberComposition bind:data={block.data} />
            {:else if block.type === "multiples-factors"}
              <MultiplesFactors bind:data={block.data} />
            {:else if block.type === "order-number-line"}
              <OrderNumberLine bind:data={block.data} />
            {:else if block.type === "sequence-claim"}
              <SequenceClaim bind:data={block.data} />
            {:else if block.type === "place-value-decode"}
              <PlaceValueDecode bind:data={block.data} />
            {:else if block.type === "math-flow-diagram"}
              <MathFlowDiagram bind:data={block.data} />
            {:else if block.type === "number-card-match"}
              <NumberCardMatch bind:data={block.data} />
            {:else if block.type === "find-incorrect-decomp"}
              <FindIncorrectDecomposition bind:data={block.data} />
            {:else if block.type === "number-card-calc"}
              <NumberCardCalc bind:data={block.data} />
            {/if}
          </div>
        </div>
      </div>
    {/each}

    {#if $worksheetBlocks.length === 0}
      <div class="empty-state no-print">
        <p>Your worksheet is empty.</p>
        <p>Click on problems from the sidebar to add them.</p>
      </div>
    {/if}
  </section>
</div>

<style>
  .worksheet-page {
    width: var(--page-width);
    min-height: var(--page-height);
    padding: var(--page-padding);
    background-color: white;
    /* Draws a solid 'page break' indicator line every 11 inches */
    background-image: repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent calc(11in - 2px),
      var(--accent) calc(11in - 2px),
      var(--accent) 11in
    );
    box-shadow: var(--shadow-lg);
    position: relative;
    margin: 0 auto 2rem auto;
    text-align: left;
    border-radius: var(--radius-sm);
  }

  .worksheet-header {
    margin-bottom: 2rem;
  }

  .header-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }

  .field {
    display: flex;
    align-items: flex-end;
    flex: 1;
    margin-right: 2rem;
  }
  .field:last-child {
    margin-right: 0;
  }

  .dotted-line {
    flex-grow: 1;
    border-bottom: 2px dotted var(--text-main);
    margin-left: 0.5rem;
    height: 1.5rem;
  }

  .title-row {
    text-align: center;
    margin-top: 2.5rem;
    margin-bottom: 2rem;
  }

  .title-row h2 {
    font-weight: 700;
    letter-spacing: 1px;
    margin: 0;
  }

  .dnd-zone {
    min-height: 50vh;
  }

  .problem-wrapper {
    position: relative;
    border: 1px solid transparent;
    transition: all 0.2s;
    margin-bottom: 2rem;
  }

  .problem-wrapper:hover {
    border-color: var(--border);
    background-color: var(--surface-hover);
  }

  .block-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0.5rem;
    background: var(--bg-color);
    border-bottom: 1px solid var(--border);
    font-size: 0.75rem;
    color: var(--text-muted);
    opacity: 0;
    transition: opacity 0.2s;
    position: absolute;
    top: -24px;
    left: 0;
    right: 0;
  }

  .problem-wrapper:hover .block-controls {
    opacity: 1;
  }

  .drag-handle {
    cursor: grab;
    user-select: none;
    padding: 0.2rem;
  }

  .remove-btn {
    background: transparent;
    border: none;
    color: var(--danger);
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
  }

  .remove-btn:hover {
    font-weight: bold;
  }

  .problem-content {
    padding: 0.5rem 0;
    display: flex;
    gap: 0.5rem;
  }

  .problem-number {
    font-weight: bold;
    font-size: 1.1rem;
    width: 1.5rem;
    flex-shrink: 0;
  }

  .problem-body {
    flex-grow: 1;
  }

  .empty-state {
    text-align: center;
    color: var(--text-muted);
    padding: 4rem 2rem;
    border: 2px dashed var(--border);
    border-radius: var(--radius-lg);
    margin-top: 2rem;
  }
</style>
