<script>
  import { getContext } from "svelte";

  export let value;

  const api = getContext("radioGroupAPI");
  const { uuid, activeValue } = api;

  $: checked = $activeValue === value;
</script>

<button
  on:click={() => ($activeValue = value)}
  id={`radiogroup-${uuid}-option-1`}
  class="grow bg-gray-200 dark:bg-gray-700 p-3 rounded-l-full last:rounded-l-none last:rounded-r-full border border-gray-800/10 dark:border-gray-100/10 hover:bg-cyan-300/50 dark:hover:bg-blue-600/50 last:border-l-0 transition-colors ease-out"
  class:checked
  role="radio"
  aria-checked={checked}
  tabindex="0"
  aria-labelledby={`radiogroup-${uuid}-radiolabel-1`}
>
  <p id={`radiogroup-${uuid}-radiolabel-1`}><slot /></p>
</button>

<style>
  .checked {
    @apply bg-cyan-400 dark:bg-blue-600;
  }
</style>
