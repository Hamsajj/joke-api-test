<script>
  import { SvelteUIProvider } from "@svelteuidev/core";
  import Jokes from "./lib/Jokes.svelte";
</script>

<SvelteUIProvider withGlobalStyles>
  <div class="container">
    <div class="joke-container">
      <Jokes />
    </div>
  </div>
</SvelteUIProvider>

<style>
  .container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .joke-container{
    width: 80%;
  }
</style>
