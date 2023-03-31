<script lang="ts">
  import type { JokeAnalyzes } from "../models/joke";
  import { Group } from "@svelteuidev/core";

  import Analyze from "./Analyze.svelte";

  export let analyzes: JokeAnalyzes[];
</script>

<Group position="center" spacing="xs" grow>
  {#each analyzes as analyzeResult}
    <div class="analyze-card">
      <Analyze {analyzeResult} />
    </div>
  {/each}
</Group>

<!-- <div class="analyzes-container">
  {#each analyzes as analyzeResult}
    <div class="analyze-card">
      <Analyze {analyzeResult} />
    </div>
  {/each}
</div> -->
<style>

  .analyze-card {
    padding: 1em 2%;
    min-width: 46%;
    border: solid #a9a9a945;
    border-radius: 10px;
  }

  .analyze-card:hover {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 3px,
      rgba(0, 0, 0, 0.05) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
</style>
