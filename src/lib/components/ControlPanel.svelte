<script lang="ts">
  import BaseRadioGroup from "../components/BaseRadioGroup.svelte";
  import BaseRangeSlider from "../components/BaseRangeSlider.svelte";
  import BaseSwitch from "../components/BaseSwitch.svelte";
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
      <button
        on:click|preventDefault={() =>
          random.set(getRandom(freqProps.max * 2 - 2, 0.2))}
        class="p-1 transition-colors ease-out hover:text-brand"
        class:random-button-active={!isRandom}
        disabled={!isRandom}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            d="M2 7H1C1 7.55228 1.44772 8 2 8V7ZM3.07026 6L3.75297 6.73068L3.8615 6.62929L3.93586 6.50073L3.07026 6ZM18 13H19C19 12.4477 18.5523 12 18 12L18 13ZM10 18L10 17L10 18ZM16.9297 14L16.247 13.2693L16.1385 13.3707L16.0641 13.4993L16.9297 14ZM8 6H2V8H8V6ZM3 7V1H1V7H3ZM10 3C13.866 3 17 6.13401 17 10H19C19 5.02944 14.9706 1 10 1V3ZM3.93586 6.50073C5.14771 4.40581 7.41027 3 10 3V1C6.66747 1 3.75928 2.81178 2.20465 5.49927L3.93586 6.50073ZM2.38754 5.26932L1.31728 6.26932L2.68272 7.73068L3.75297 6.73068L2.38754 5.26932ZM12 14L18 14L18 12L12 12L12 14ZM17 13V19H19V13H17ZM10 17C6.13401 17 3 13.866 3 10L1 10C1 14.9706 5.02944 19 10 19L10 17ZM16.0641 13.4993C14.8523 15.5942 12.5897 17 10 17L10 19C13.3325 19 16.2407 17.1882 17.7953 14.5007L16.0641 13.4993ZM17.6125 14.7307L18.6827 13.7307L17.3173 12.2693L16.247 13.2693L17.6125 14.7307Z"
          />
        </svg>
      </button>
    </div>
  </div>
  <div class="border-t border-black/10 dark:border-gray-100/10" />
  <div class="flex flex-col gap-1">
    <BaseRangeSlider bind:value={$frequency} {...freqProps} />
    <input type="range" bind:value={$frequency} {...freqProps} />
    <BaseRangeSlider bind:value={$amplitude} {...ampProps} />
    <BaseRangeSlider bind:value={$strokeWeight} {...strokeProps} />
    <BaseRangeSlider bind:value={$flow} {...flowProps} />
  </div>
  <div class="border-t border-black/10 dark:border-gray-100/10" />
  <div class="flex gap-3">
    <button
      on:click|preventDefault={() => copySVG(svgContainer)}
      class="grow text-center bg-gray-50 dark:bg-gray-600 hover:bg-brand hover:text-white rounded-full border border-gray-800/10 dark:border-gray-100/10 p-3 transition-colors ease-out"
    >
      Copy SVG
    </button>
    <button
      on:click|preventDefault={() => downloadSVG(svgContainer)}
      class="grow text-center bg-gray-50 dark:bg-gray-600 hover:bg-brand hover:text-white rounded-full border border-gray-800/10 dark:border-gray-100/10 p-3 transition-colors ease-out"
    >
      Download
    </button>
  </div>
</div>

<style>
  .random-button-active {
    @apply opacity-25 hover:text-current;
  }
</style>
