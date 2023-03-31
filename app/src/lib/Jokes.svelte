<script lang="ts">
  import Joke from "./Joke.svelte";
  import type { Joke as JokeModel, JokeAnalyzes } from "../models/joke.js";
  import { onMount } from "svelte";
  import Analyzes from "./Analyzes.svelte";
  import { Cross2 } from "radix-icons-svelte";
  import {
    Container,
    Group,
    Input,
    Button,
    Affix,
    Notification,
  } from "@svelteuidev/core";

  let jokes: JokeModel[];
  let analyzes: JokeAnalyzes[];
  let amount: number;
  let amountDirty = false;
  let type: string;
  let typeDirty = false;
  let loading: boolean = false;
  let errorMessage = "";

  function validateForm(): boolean {
    return (
      ["single", "twopart", "any"].includes(type) && 5 <= amount && amount <= 10
    );
  }
  async function fetchJokes(amount: number, type: string) {
    loading = true;
    errorMessage = "";
    if (!amount) {
      amount = 10;
    }
    if (!type) {
      type = "any";
    }
    let serverURL = import.meta.env.SERVER_URL || "http://localhost:3000";
    let queryString = new URLSearchParams({
      amount: amount.toString(),
      type,
    }).toString();

    try {
      const result = await fetch(`${serverURL}/jokes/list?` + queryString);
      const data = await result.json();
      if (result.status != 200) {
        throw new Error(data.errors);
      }
      jokes = data.jokes;
      analyzes = data.analyzes;
      loading = false;
    } catch (e) {
      errorMessage = e;
      loading = false;

      console.log("There was an error", errorMessage);
    }
  }
  onMount(async () => {
    await fetchJokes(amount, type);
  });
</script>

<div class="input-container">
  <Container size="lg">
    <Group grow>
      <Input
        type="number"
        on:change={(val) => {
          amountDirty = true;
        }}
        bind:value={amount}
        placeholder="amount (between 5 to 10)"
        radius="md"
        invalid={amountDirty && (amount < 5 || amount > 10)}
      />

      <Input
        bind:value={type}
        on:change={() => {
          typeDirty = true;
        }}
        placeholder="type ('single', 'twopart' or 'any')"
        radius="md"
        invalid={typeDirty && !["single", "twopart", "any"].includes(type)}
      />

      {#key amount && type}
        <Button
          on:click={() => {
            fetchJokes(amount, type);
          }}
          disabled={loading || !validateForm()}
          ripple>{loading ? "please wait" : "Reload"}</Button
        >
      {/key}
    </Group>
  </Container>
  <Affix position={{ bottom: 50, right: 50 }}>
    {#if errorMessage != ""}
      <Notification
        on:close={() => {
          errorMessage = "";
        }}
        icon={Cross2}
        color="red"
      >
        Error occurred: {errorMessage}
      </Notification>
    {/if}
  </Affix>
</div>

{#if jokes && jokes.length}
  <div class="analyze-container">
    <Container size="lg">
      <Analyzes {analyzes} />
    </Container>
  </div>
  <Container size="lg">
    {#each jokes as joke, i}
      <div class="joke-card">
        <Joke {joke} title={`Joke #${i + 1}`} />
      </div>
    {/each}
  </Container>
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

  .input-container,
  .analyze-container {
    padding-bottom: 2em;
  }
</style>
