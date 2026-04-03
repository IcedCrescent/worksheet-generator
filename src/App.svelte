<script lang="ts">
  import Sidebar from './components/Sidebar.svelte';
  import Canvas from './components/Canvas.svelte';
</script>

<main class="app-container">
  <div class="sidebar-wrapper no-print">
    <Sidebar />
  </div>
  <div class="canvas-wrapper">
    <Canvas />
  </div>
</main>

<style>
  .app-container {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }
  
  .sidebar-wrapper {
    width: 320px;
    flex-shrink: 0;
    border-right: 1px solid var(--border);
    background: var(--surface);
    height: 100%;
    overflow-y: auto;
    z-index: 10;
    box-shadow: var(--shadow-md);
  }
  
  .canvas-wrapper {
    flex-grow: 1;
    overflow-y: auto;
    padding: 2rem;
    display: block;
    text-align: center;
    background-color: var(--bg-color);
  }

  /* When printing, remove grid/flex structures that constrain the document */
  @media print {
    .app-container {
      height: auto;
      overflow: visible;
      display: block;
    }
    .canvas-wrapper {
      padding: 0;
      overflow: visible;
      display: block;
      background-color: white;
    }
  }
</style>
