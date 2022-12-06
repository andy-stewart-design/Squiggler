<script lang="ts">
  import { RadioGroup, RadioLabel, RadioOption } from "neutral-ui";
  import type { Value } from "neutral-ui/radio-group/types";
  import type { RadioGroupOption } from "../types/app";

  export let value: Value;
  export let label: string;
  export let options: RadioGroupOption[];
</script>

<RadioGroup bind:value class="flex items-center">
  <RadioLabel class="grow" visible>{label}</RadioLabel>
  {#each options as option}
    <RadioOption
      value={option.val}
      let:checked
      class="bg-gray-200 dark:bg-gray-700 border border-black/10 dark:border-gray-100/10 hover:bg-brand/30 first-of-type:rounded-l-full last-of-type:rounded-r-full last-of-type:border-l-0 overflow-hidden focus-visible:z-10"
    >
      <span
        class="flex justify-center items-center text-center w-12 h-9 transition-colors ease-out"
        class:checked
        class:px-1={option.text}
      >
        {#if option.text}
          {option.text}
        {:else if option.component}
          <RadioLabel inner>{value}</RadioLabel>
          <svelte:component this={option.component} />
        {/if}
      </span>
    </RadioOption>
  {/each}
</RadioGroup>

<style>
  .checked {
    @apply bg-brand text-white;
  }
</style>
