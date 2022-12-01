<script>
  import { Switch, SwitchLabel } from "neutral-ui";

  export let value;
</script>

<div class="grow flex justify-between items-center gap-2">
  <Switch bind:value class={value ? "switch-bg switch-bg-active" : "switch-bg"}>
    <SwitchLabel slot="start"><span>Randomize</span></SwitchLabel>
    <div
      class="w-6 h-6 bg-white rounded-full transition-transform left"
      class:switch-thumb-active={value}
      aria-hidden="true"
    />
  </Switch>
</div>

<style global>
  .switch-bg {
    @apply relative flex shrink-0 bg-gray-200 dark:bg-gray-700 border border-black/10 dark:border-gray-100/10 cursor-pointer w-16 p-1 pr-7 rounded-full transition-colors duration-200 ease-in-out hover:bg-brand/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75;
  }
  .switch-bg-active {
    @apply bg-brand hover:bg-brand;
  }
  .switch-thumb-active {
    @apply translate-x-[1.875rem];
  }
</style>
