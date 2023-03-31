<script lang="ts">
  import type { JokeAnalyzes } from "../models/joke";

  import {
    Badge,
    Button,
    Card,
    Container,
    Group,
    Image,
    Text,
  } from "@svelteuidev/core";

  export let analyzeResult: JokeAnalyzes;
</script>

<div class="analyze-container">
  <div class="description">
    <Text size="xs" weight={100}>
      {analyzeResult.description}
    </Text>
  </div>
  <div class="value">
    <Text weight={"bold"}>{analyzeResult.value}</Text>
  </div>
</div>

<style>
  .analyze-container {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .description {
    color: gray;
    padding: 1em 0;
  }
</style>
