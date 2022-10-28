<script>
  // @ts-nocheck
  import { fade } from "svelte/transition";
  import { map } from "@utils/math";

  // Props
  export let value;
  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let counter = "percentage";
  //   export let ticked = false;

  // Props (a11y)
  export let name;
  let id = `range-slider-${crypto.randomUUID()}`; // unique id

  const defaultValue = value;

  $: normalizedVal = map(value, min, max, 0, 100);
</script>

<div class="flex flex-col gap-3">
  <div class="flex justify-between">
    <div class="flex gap-2 items-center">
      <label for={id}><slot /></label>
      {#if defaultValue !== value}
        <button
          on:click={() => (value = defaultValue)}
          transition:fade={{ duration: 100 }}
          class="text-gray-800/30 dark:text-gray-100/30 w-5 h-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill="currentColor"
              d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
            />
          </svg>
        </button>
      {/if}
    </div>
    <div class="tabular-nums text-gray-800/60 dark:text-gray-100/60">
      {counter === "percentage" ? Math.floor(normalizedVal) + "%" : value}
    </div>
  </div>
  <div class="relative block w-full">
    <div class="absolute top-0 left-0 h-2 w-full overflow-hidden rounded-full">
      <div
        class="absolute top-0 left-0 h-full w-full bg-gray-200 dark:bg-gray-700 border border-gray-800/5 dark:border-gray-100/10 rounded-full"
      />
      <div
        class="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-cyan-400 dark:from-blue-400 to-cyan-500 dark:to-blue-700 origin-left rounded-full"
        style={`clip-path: polygon(0 0, ${normalizedVal}% 0, ${normalizedVal}% 100%, 0 100%);`}
      />
    </div>
    <input
      type="range"
      bind:value
      {id}
      class="relative block w-full h-2 bg-gray-200/0 rounded-lg appearance-none cursor-pointer"
      {name}
      {min}
      {max}
      {step}
      aria-label={name}
    />
  </div>
</div>

<!-- ${$$props.class} -->
<style>
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    @apply bg-cyan-400 dark:bg-blue-500 w-4 h-4 rounded-full shadow-lg;
    border: 1px solid rgba(31, 41, 55, 0.3);
  }
  input[type="range"]::-moz-range-thumb {
    @apply bg-cyan-400 dark:bg-blue-500 w-4 h-4 rounded-full shadow-lg;
    border: 1px solid rgba(31, 41, 55, 0.3);
  }
</style>
