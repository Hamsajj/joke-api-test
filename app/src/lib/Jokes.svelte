<script lang="ts">
  import Joke from "./Joke.svelte";
  import type { Joke as JokeModel, JokeAnalyzes } from "../models/joke.js";
  import { mockJokes } from "../mocks/jokes";
  import { onMount } from "svelte";
  import Analyzes from "./Analyzes.svelte";

  let jokes: JokeModel[];
  let analyzes: JokeAnalyzes[];
  onMount(async () => {
    let serverURL = import.meta.env.SERVER_URL || "http://localhost:3000"
    await fetch(`${serverURL}/jokes/list`)
      .then(r => r.json())
      .then(data => {
        jokes = data.jokes;
        analyzes = data.analyzes;
      });
  });
</script>

{#if jokes && jokes.length}
<div class="analyzes">
    <Analyzes {analyzes}/>
</div>
<div class="jokes">
{#each jokes as joke, i}
    <div class="joke-card">
      <Joke {joke} title={`Joke #${i + 1}`} />
    </div>
  {/each}
</div>  
{:else}
  <p class="loading">loading...</p>
{/if}

<style>
  .loading {
    opacity: 0;
    animation: 0.4s 0.8s forwards fade-in;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .joke-card {
    margin: 10px;
  }
</style>
