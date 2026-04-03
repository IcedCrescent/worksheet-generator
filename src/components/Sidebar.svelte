<script lang="ts">
  import {
    FileText,
    Calculator,
    FileDigit,
    ListOrdered,
    Plus,
    Printer,
    Trash2,
    Clock,
    CheckSquare,
    Hash,
    Target,
    Watch,
    ChevronDown,
  } from "lucide-svelte";
  import { worksheetBlocks, generateId, type ProblemType } from "../lib/store";

  function addProblem(type: ProblemType) {
    const newBlock = {
      id: generateId(),
      type,
      data: {},
    };
    $worksheetBlocks = [...$worksheetBlocks, newBlock];
  }

  function handlePrint() {
    window.print();
  }

  function clearWorksheet() {
    if (confirm("Are you sure you want to clear the worksheet?")) {
      $worksheetBlocks = [];
    }
  }

  let problemGroups = [
    {
      label: "Numbers & Sequences",
      open: true,
      items: [
        {
          type: "sequence-analysis" as ProblemType,
          label: "Sequence Analysis",
          icon: ListOrdered,
          desc: "Find missing numbers & identify rules",
        },
        {
          type: "number-to-words" as ProblemType,
          label: "Number to Words",
          icon: FileText,
          desc: "Write out large numbers",
        },
        {
          type: "sequence-word" as ProblemType,
          label: "Sequence Word Problem",
          icon: FileText,
          desc: "Nth term word problems",
        },
        {
          type: "multiplication" as ProblemType,
          label: "10s/100s Multiplication",
          icon: Calculator,
          desc: "Multiply/divide by powers of 10",
        },
        {
          type: "true-false" as ProblemType,
          label: "True/False Statements",
          icon: CheckSquare,
          desc: "Place value & unit equivalences",
        },
        {
          type: "number-line-jumps" as ProblemType,
          label: "Number Line Jumps",
          icon: Hash,
          desc: "Start at x, count on/back y",
        },
        {
          type: "decompose-number" as ProblemType,
          label: "Decompose Numbers",
          icon: FileDigit,
          desc: "Value of digits & expansion",
        },
        {
          type: "number-composition" as ProblemType,
          label: "Number Composition",
          icon: Hash,
          desc: "Circle parts that make a number",
        },
        {
          type: "multiples-factors" as ProblemType,
          label: "Multiples & Factors",
          icon: Calculator,
          desc: "Factor pairs & common factors",
        },
        {
          type: "order-number-line" as ProblemType,
          label: "Order on Number Line",
          icon: Hash,
          desc: "Place integers on a number line",
        },
        {
          type: "sequence-claim" as ProblemType,
          label: "Sequence Claim",
          icon: ListOrdered,
          desc: "Verify if a term is reachable",
        },
        {
          type: "place-value-decode" as ProblemType,
          label: "Place Value Decode",
          icon: FileDigit,
          desc: "Reconstruct number from digit clues",
        },
        {
          type: "math-flow-diagram" as ProblemType,
          label: "Math Flow Diagram",
          icon: Calculator,
          desc: "×/÷ oval chain diagram",
        },
        {
          type: "number-card-match" as ProblemType,
          label: "Number Card Match",
          icon: FileText,
          desc: "Match calculations to word cards",
        },
        {
          type: "find-incorrect-decomp" as ProblemType,
          label: "Find Incorrect Expansion",
          icon: CheckSquare,
          desc: "Spot the wrong decomposition",
        },
        {
          type: "number-card-calc" as ProblemType,
          label: "Number Card Calc",
          icon: Calculator,
          desc: "Pick 2 cards to complete equations",
        },
      ],
    },
    {
      label: "Date & Time",
      open: true,
      items: [
        {
          type: "analog-clock" as ProblemType,
          label: "Analog Clocks",
          icon: Watch,
          desc: "Read and match clock face times",
        },
        {
          type: "time-duration" as ProblemType,
          label: "Time & Duration",
          icon: Clock,
          desc: "Word problem with travel time",
        },
        {
          type: "time-table" as ProblemType,
          label: "Mixed Time Tables",
          icon: Clock,
          desc: "Spoken, 24-hr, Analog completion",
        },
        {
          type: "time-matching" as ProblemType,
          label: "Match Times",
          icon: Hash,
          desc: "Match spoken time to digital box",
        },
        {
          type: "time-difference" as ProblemType,
          label: "Time Differences",
          icon: Clock,
          desc: "Calculate minutes between times",
        },
        {
          type: "time-conversion" as ProblemType,
          label: "Time Unit Conversion",
          icon: Clock,
          desc: "Convert days/hours/minutes/seconds",
        },
      ],
    },
    {
      label: "Probability",
      open: true,
      items: [
        {
          type: "probability-bag" as ProblemType,
          label: "Probability Bag",
          icon: Target,
          desc: "Chance of drawing colored bead",
        },
      ],
    },
  ];

  function toggleGroup(idx: number) {
    problemGroups[idx].open = !problemGroups[idx].open;
    problemGroups = [...problemGroups];
  }
</script>

<aside class="sidebar">
  <div class="sidebar-header">
    <h1>Worksheet<br />Generator</h1>
  </div>

  <div class="actions-group top-actions">
    <button class="btn btn-primary full-width" on:click={handlePrint}>
      <Printer size="18" /> Export to PDF
    </button>
    <button
      class="btn btn-outline full-width btn-danger"
      on:click={clearWorksheet}
    >
      <Trash2 size="18" /> Clear All
    </button>
  </div>

  <div class="problem-list">
    <h3>Add Problems</h3>
    {#each problemGroups as group, idx}
      <div class="prob-group">
        <button class="group-header" on:click={() => toggleGroup(idx)}>
          <span class="group-label">{group.label}</span>
          <span class="group-count">{group.items.length}</span>
          <span class="chevron" class:rotated={!group.open}>
            <ChevronDown size="14" />
          </span>
        </button>
        {#if group.open}
          <div class="group-items">
            {#each group.items as prob}
              <button
                class="problem-btn"
                on:click={() => addProblem(prob.type as ProblemType)}
              >
                <div class="prob-icon">
                  <svelte:component this={prob.icon} size="18" />
                </div>
                <div class="prob-info">
                  <span class="prob-title">{prob.label}</span>
                  <span class="prob-desc">{prob.desc}</span>
                </div>
                <Plus size="14" />
              </button>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</aside>

<style>
  .sidebar {
    padding: 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .sidebar-header {
    margin-bottom: 2rem;
  }

  .sidebar-header h1 {
    font-size: 1.5rem;
    line-height: 1.2;
    color: var(--accent);
    margin: 0;
  }

  .actions-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border);
  }

  .full-width {
    width: 100%;
  }

  .btn-danger {
    color: var(--danger);
    border-color: var(--danger);
  }

  .btn-danger:hover {
    background-color: #fee2e2;
  }

  .problem-list h3 {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    margin-bottom: 0.75rem;
  }

  /* ---- Groups ---- */
  .prob-group {
    margin-bottom: 0.5rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .group-header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 0.9rem;
    background: var(--bg-color);
    border: none;
    cursor: pointer;
    text-align: left;
    font-family: var(--font-sans);
    transition: background 0.15s ease;
  }

  .group-header:hover {
    background: #e8ecf5;
  }

  .group-label {
    flex-grow: 1;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent);
  }

  .group-count {
    font-size: 0.7rem;
    background: #eef2ff;
    color: var(--accent);
    border-radius: 999px;
    padding: 0.1rem 0.45rem;
    font-weight: 600;
  }

  .chevron {
    color: var(--text-muted);
    display: flex;
    align-items: center;
    transition: transform 0.2s ease;
  }

  .chevron.rotated {
    transform: rotate(-90deg);
  }

  .group-items {
    padding: 0.4rem 0.5rem 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    background: var(--surface);
  }

  /* ---- Problem Buttons ---- */
  .problem-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.75rem;
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--radius-sm);
    cursor: pointer;
    text-align: left;
    transition: all 0.15s ease;
    color: var(--text-main);
  }

  .problem-btn:hover {
    background: #eef2ff;
    border-color: #c7d2fe;
  }

  .prob-icon {
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eef2ff;
    padding: 0.4rem;
    border-radius: var(--radius-sm);
    flex-shrink: 0;
  }

  .problem-btn:hover .prob-icon {
    background: #c7d2fe;
  }

  .prob-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .prob-title {
    font-weight: 600;
    color: var(--text-main);
    font-size: 0.82rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .prob-desc {
    font-size: 0.7rem;
    color: var(--text-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
