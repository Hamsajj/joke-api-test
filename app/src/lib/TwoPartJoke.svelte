<script lang="ts">
  import type { Joke } from "../models/joke.js";
  import { Button } from "@svelteuidev/core";
  import { fade } from "svelte/transition";
  import JokeText from "./JokeText.svelte";
  export let joke: Joke;
  let revealed = false;
</script>

<div class="setup">
  <JokeText text={joke.setup} />
</div>

{#key revealed}
  <div
    class={revealed ? "deliver" : "deliver hidden"}
    in:fade={{delay: 100, duration: 100 }}
  >
    <JokeText text={joke.delivery} />
  </div>
  
{/key}
<div class="button-container">
  <Button
    on:click={() => {
      revealed = !revealed;
    }}
    variant="subtle"
    color="gray"
    radius="md"
    size="md"
    compact
    ripple
  >
    {revealed ? "hide" : "reveal"}
  </Button>
</div>
<style>
  .button-container {
    width: 100%;
    display: flex;
    place-items: center;
    place-content: center;
  }

  .hidden {
    visibility: hidden;
  }
</style>
