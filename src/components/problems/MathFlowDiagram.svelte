<script lang="ts">
  export let data: any;

  if (!data.initialized) {
    // Left diagram: multiply  e.g. center=45, ×10→450, ×10→4500, ×100→4500
    const mul = (Math.floor(Math.random() * 9) + 2) * 5; // 10–45, multiples of 5
    // Right diagram: divide  e.g. center=5000, ÷10→500, ÷10→50, ÷100→50
    const div = (Math.floor(Math.random() * 9) + 1) * 1000;
    data = { mul, div, initialized: true };
  }
</script>

<!-- 
  Layout per diagram (triangle):
      [center]          ← top, filled
     /        \
  ×100        ×10
   /              \
[bottom]        [right]
                    |
                   ×10
                    |
                [bottom]   ← same oval, bypass + chain converge

  Actually the diagram is:
            [center]
           /        \
        ×100        ×10↘
          ↓             [right oval]
        [bottom-left]    ×10↓
                       [bottom oval]

  With 3 empty ovals per diagram as a curved "leaf" shape.
-->

<div class="worksheet-prob">
  <div class="statement">Fill in the missing numbers.</div>

  <div class="diagrams-row">

    <!-- ===== LEFT DIAGRAM: multiply ===== -->
    <div class="diagram-wrap">
      <svg viewBox="0 0 200 190" class="flow-svg">
        <defs>
          <marker id="arr-l" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L7,3.5 z" fill="#64748b"/>
          </marker>
        </defs>

        <!-- center → ×10 → right oval -->
        <path d="M 115,45 Q 150,55 158,80" stroke="#64748b" stroke-width="1.5" fill="none" marker-end="url(#arr-l)"/>
        <text x="152" y="68" font-size="11" fill="#334155" text-anchor="middle">×10</text>
        <!-- right oval (empty) -->
        <ellipse cx="160" cy="100" rx="34" ry="19" fill="white" stroke="#94a3b8" stroke-width="1.5"/>

        <!-- right oval → ×10 → bottom oval -->
        <path d="M 140,115 Q 115,135 100,150" stroke="#64748b" stroke-width="1.5" fill="none" marker-end="url(#arr-l)"/>
        <text x="108" y="140" font-size="11" fill="#334155" text-anchor="middle">×10</text>
        <!-- bottom oval (empty) -->
        <ellipse cx="78" cy="165" rx="38" ry="19" fill="white" stroke="#94a3b8" stroke-width="1.5"/>

        <!-- center → ×100 → bottom-left (curves left and down) -->
        <path d="M 68,52 Q 20,80 40,148" stroke="#64748b" stroke-width="1.5" fill="none" marker-end="url(#arr-l)"/>
        <text x="24" y="105" font-size="11" fill="#334155" text-anchor="middle">×100</text>

        <!-- center filled oval -->
        <ellipse cx="95" cy="35" rx="38" ry="22" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
        <text x="95" y="41" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e293b">{data.mul}</text>
      </svg>
    </div>

    <!-- ===== RIGHT DIAGRAM: divide ===== -->
    <div class="diagram-wrap">
      <svg viewBox="0 0 200 190" class="flow-svg">
        <defs>
          <marker id="arr-r" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L7,3.5 z" fill="#64748b"/>
          </marker>
        </defs>

        <!-- center → ÷10 → right oval -->
        <path d="M 115,45 Q 150,55 158,80" stroke="#64748b" stroke-width="1.5" fill="none" marker-end="url(#arr-r)"/>
        <text x="152" y="68" font-size="11" fill="#334155" text-anchor="middle">÷10</text>
        <!-- right oval (empty) -->
        <ellipse cx="160" cy="100" rx="34" ry="19" fill="white" stroke="#94a3b8" stroke-width="1.5"/>

        <!-- right oval → ÷10 → bottom oval -->
        <path d="M 140,115 Q 115,135 100,150" stroke="#64748b" stroke-width="1.5" fill="none" marker-end="url(#arr-r)"/>
        <text x="108" y="140" font-size="11" fill="#334155" text-anchor="middle">÷10</text>
        <!-- bottom oval (empty) -->
        <ellipse cx="78" cy="165" rx="38" ry="19" fill="white" stroke="#94a3b8" stroke-width="1.5"/>

        <!-- center → ÷100 → bottom-left -->
        <path d="M 68,52 Q 20,80 40,148" stroke="#64748b" stroke-width="1.5" fill="none" marker-end="url(#arr-r)"/>
        <text x="24" y="105" font-size="11" fill="#334155" text-anchor="middle">÷100</text>

        <!-- center filled oval -->
        <ellipse cx="95" cy="35" rx="42" ry="22" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
        <text x="95" y="41" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">{data.div}</text>
      </svg>
    </div>

  </div>
</div>

<style>
  .worksheet-prob { font-size: 1.1rem; line-height: 1.6; }
  .statement { font-weight: 600; padding-left: 0.5rem; margin-bottom: 1.5rem; }
  .diagrams-row { display: flex; justify-content: space-around; align-items: flex-start; gap: 2rem; }
  .diagram-wrap { display: flex; justify-content: center; }
  .flow-svg { width: 190px; height: 190px; }
  text { font-family: 'Inter', sans-serif; }
</style>
