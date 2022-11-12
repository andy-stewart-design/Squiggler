<script>
  import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "neutral-ui";

  export let value;
  export let label;
  export let options;
</script>

<RadioGroup bind:value class="flex grow">
  <RadioGroupLabel>{label}</RadioGroupLabel>
  {#each options as option}
    <RadioGroupOption
      value={option.val}
      let:checked
      class="grow bg-gray-200 dark:bg-gray-700 border border-gray-800/10 dark:border-gray-100/10 hover:bg-cyan-300/50 dark:hover:bg-blue-600/50 first-of-type:rounded-l-full last-of-type:rounded-r-full last-of-type:border-l-0 overflow-hidden focus-visible:z-10"
    >
      <RadioGroupLabel inner class="grid">
        <span class="text-center p-3 transition-colors ease-out" class:checked>
          {option.text}
        </span>
      </RadioGroupLabel>
    </RadioGroupOption>
  {/each}
</RadioGroup>

<style>
  .checked {
    @apply bg-cyan-400 dark:bg-blue-600;
  }
</style>
