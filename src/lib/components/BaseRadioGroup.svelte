<script lang="ts">
  import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "neutral-ui";
  import type { Value } from "neutral-ui/radio-group/types";
  import type { RadioOption } from "../types/app";

  export let value: Value;
  export let label: string;
  export let options: RadioOption[];
</script>

<RadioGroup bind:value class="flex items-center">
  <RadioGroupLabel class="grow" visible>{label}</RadioGroupLabel>
  {#each options as option}
    <RadioGroupOption
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
          <RadioGroupLabel inner>{value}</RadioGroupLabel>
          <svelte:component this={option.component} />
        {/if}
      </span>
    </RadioGroupOption>
  {/each}
</RadioGroup>

<style>
  .checked {
    @apply bg-brand text-white;
  }
</style>
