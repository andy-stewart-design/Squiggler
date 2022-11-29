<script>
  import { Switch, SwitchLabel } from "neutral-ui";

  export let value;
</script>

<div class="grow flex justify-between items-center gap-2">
  <Switch bind:value class={value ? "switch-bg switch-bg-active" : "switch-bg"}>
    <SwitchLabel slot="start"><span>Randomize</span></SwitchLabel>
    <div
      class="w-6 h-6 bg-white rounded-full transition-transform"
      class:translate-x-full={value}
      aria-hidden="true"
    />
  </Switch>
</div>

<style scoped>
  :global(.switch-bg) {
    @apply relative flex shrink-0 bg-gray-200 dark:bg-gray-800 border border-black/10 dark:border-gray-100/10 cursor-pointer p-1 pr-7 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75;
  }
  :global(.switch-bg-active) {
    @apply bg-brand/75;
  }
  /* .switch {
    @apply relative flex shrink-0 bg-gray-200 dark:bg-gray-800 border border-black/10 dark:border-gray-100/10 cursor-pointer p-1 pr-7 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75;
  } */
</style>
