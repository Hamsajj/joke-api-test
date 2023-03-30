<script lang="ts">
  import { Text } from "@svelteuidev/core";
  import type { Joke } from "../models/joke.js";
  export let joke: Joke;
</script>

<Text size="sm">
  {joke.setup}
</Text>

<Text size="sm">
  {joke.delivery}
</Text>