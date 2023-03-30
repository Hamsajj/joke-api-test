<script lang="ts">
  import Joke from "./Joke.svelte";
  import type { Joke as JokeModel } from "../models/joke.js";
  import { mockJokes } from "../mocks/jokes";
  import { onMount } from "svelte";

  let jokes: JokeModel[];

  onMount(async () => {
    jokes = mockJokes;
  });
</script>

{#if jokes && jokes.length}
  {#each jokes as joke, i}
    <div class="joke-card">
      <Joke {joke} title={`Joke #${i + 1}`} />
    </div>
  {/each}
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
