<script>
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  const dispatch = createEventDispatcher();

  export let type = "success";
  export let dismissible = true;
</script>

<article
  class="relative flex items-center min-w-[240px] bg-brand rounded"
  role="alert"
  in:fly={{ x: -40, duration: 300, easing: cubicOut }}
  out:fade={{ duration: 300, easing: cubicOut }}
  data-type={type}
>
  <div class="grow font-medium text-sm text-center py-2 px-3">
    <slot />
  </div>
  {#if dismissible}
    <button
      on:click={() => dispatch("dismiss")}
      class="bg-gray-100 bg-opacity-0 hover:bg-opacity-20 transition-colors border-l border-gray-100/20 p-3"
    >
      <span class="sr-only">Close</span>
      <svg viewBox="0 0 12 12" width="12" height="12">
        <line x1="1" y1="1" x2="11" y2="11" class="stroke-[1.5] stroke-white" />
        <line x1="1" y1="11" x2="11" y2="1" class="stroke-[1.5] stroke-white" />
      </svg>
    </button>
  {/if}
</article>

<style>
  .sr-only {
    border: 0;
    clip: rect(0 0 0 0);
    height: auto;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }
</style>
