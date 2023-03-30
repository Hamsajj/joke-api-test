<script lang="ts">
  import type { Joke } from "../models/joke.js";
  import JokeText from "./JokeText.svelte";
  export let joke: Joke;
</script>

<JokeText text={joke.joke}/>
