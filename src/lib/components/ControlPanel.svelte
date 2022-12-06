<script lang="ts">
  import { Button } from "neutral-ui";
  import BaseRadioGroup from "../components/BaseRadioGroup.svelte";
  import BaseRangeSlider from "../components/BaseRangeSlider.svelte";
  import BaseSwitch from "../components/BaseSwitch.svelte";
  import Refresh from "../icons/Refresh.svelte";
  import {
    frequency,
    freqProps,
    amplitude,
    ampProps,
    flow,
    flowProps,
    strokeWeight,
    strokeProps,
    isRandom,
    orientation,
    orientProps,
    strokeCap,
    capProps,
    random,
  } from "../stores/path";
  import { getRandom } from "../utils/math";
  import { copySVG, downloadSVG } from "../utils/svg";

  // export let frequency: number;

  export let svgContainer: HTMLElement;
</script>

<div
  class="flex flex-col gap-6 font-medium text-sm p-6 bg-gray-100 dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/10 rounded-2xl shadow-2xl min-w-[320px] h-auto max-h-[calc(100vh-1rem)] overflow-y-auto"
>
  <div class="flex flex-col gap-4">
    <BaseRadioGroup bind:value={$orientation} {...orientProps} />
    <BaseRadioGroup bind:value={$strokeCap} {...capProps} />
    <div class="flex gap-2">
      <BaseSwitch bind:value={$isRandom} />
      <!-- <button
        on:click|preventDefault={() =>
          random.set(getRandom(freqProps.max * 2 - 2, 0.2))}
        class="p-1 transition-colors ease-out hover:text-brand"
        class:random-button-active={!$isRandom}
        disabled={!$isRandom}
        aria-label="Refresh Random Values"
      >
        <Refresh class="w-5 h-5" />
      </button> -->
      <Button
        on:click={() => random.set(getRandom(freqProps.max * 2 - 2, 0.2))}
        class="random-button"
        disabled={!$isRandom}
        label="Refresh Random Values"
      >
        <Refresh class="w-5 h-5" slot="start" />
      </Button>
    </div>
  </div>
  <div class="border-t border-black/10 dark:border-gray-100/10" />
  <div class="flex flex-col gap-1">
    <BaseRangeSlider bind:value={$frequency} {...freqProps} />
    <BaseRangeSlider bind:value={$amplitude} {...ampProps} />
    <BaseRangeSlider bind:value={$strokeWeight} {...strokeProps} />
    <BaseRangeSlider bind:value={$flow} {...flowProps} />
  </div>
  <div class="border-t border-black/10 dark:border-gray-100/10" />
  <div class="flex gap-3">
    <Button
      on:click={() => copySVG(svgContainer)}
      class="grow text-center bg-gray-50 dark:bg-gray-600 hover:bg-brand hover:text-white rounded-full border border-gray-800/10 dark:border-gray-100/10 p-3 transition-colors ease-out"
      >Copy SVG</Button
    >
    <Button
      on:click={() => downloadSVG(svgContainer)}
      class="grow text-center bg-gray-50 dark:bg-gray-600 hover:bg-brand hover:text-white rounded-full border border-gray-800/10 dark:border-gray-100/10 p-3 transition-colors ease-out"
      >Download</Button
    >
  </div>
</div>

<style global>
  .random-button {
    @apply p-1 transition-colors ease-out hover:text-brand;
  }
  /* .random-button.active {
    @apply opacity-25 hover:text-current;
  } */
  .random-button:disabled {
    @apply opacity-25 hover:text-current;
  }
</style>
