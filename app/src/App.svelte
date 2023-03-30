<script>
  import { SvelteUIProvider } from '@svelteuidev/core';
  import Jokes from './lib/Jokes.svelte';
</script>

<SvelteUIProvider withGlobalStyles>
  <div class="container">
    <Jokes />
</div>
</SvelteUIProvider>
