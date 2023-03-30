<script lang="ts">
  import { Badge, Button, Card, Group, Image, Text } from "@svelteuidev/core";
  import type { Joke } from "../models/joke.js";
  import SingleJoke from "./SingleJoke.svelte";
  import TwoPartJoke from "./TwoPartJoke.svelte";
  export let joke: Joke;
  export let title: string;
  function getJokeText(): string {
    if (joke.type === "single") {
      return joke.joke;
    } else {
      return joke.setup + "<br>" + joke.delivery;
    }
  }
</script>

<Card shadow="sm" padding="lg">
  <Group position="apart">
    <Text weight={500}>{title}</Text>
    <Badge color="pink" variant="light">
      {joke.category}
    </Badge>
  </Group>

  {#if joke.type == "single"}
    <SingleJoke {joke} />
  {:else}
    <TwoPartJoke {joke} />
  {/if}
</Card>
