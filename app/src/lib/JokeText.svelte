<script lang="ts">
  import { Text } from "@svelteuidev/core";
  import { onMount } from "svelte";
  import { get } from "svelte/store";


    export let text: string;
    function getAttention(text: string) {
        return text.split(" ").map((word: string) => {
            if (word.toLowerCase().includes("a")) {
                word = `<span class="attention">${word}</span>`
            }
            return word;
        }).join(" ")
    }
</script>

<div class="joke-text">
<Text inherit>
    {@html getAttention(text)}
</Text>
</div>

<style>
    .joke-text {
        padding: 1em 0;
        line-height: 1.2em;
    }
    
</style>