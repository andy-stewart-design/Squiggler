<script>
  import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "neutral-ui";

  export let value;
  export let label;
  export let options;
</script>

<RadioGroup bind:value class="flex items-center">
  <RadioGroupLabel class="grow" visible>{label}</RadioGroupLabel>
  {#each options as option}
    <RadioGroupOption
      value={option.val}
      let:checked
      class="bg-gray-200 dark:bg-gray-800 border border-black/10 dark:border-gray-100/10 hover:bg-gray-900/10 dark:hover:bg-brand/30 first-of-type:rounded-l-full last-of-type:rounded-r-full last-of-type:border-l-0 overflow-hidden focus-visible:z-10"
    >
      <RadioGroupLabel inner class="grid">
        <span
          class="text-center py-2 px-4 transition-colors ease-out"
          class:checked
        >
          {option.text}
        </span>
      </RadioGroupLabel>
    </RadioGroupOption>
  {/each}
</RadioGroup>

<style>
  .checked {
    @apply bg-brand/75;
  }
</style>
