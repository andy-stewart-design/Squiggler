<script lang="ts">
  // TODO global reset
  // TODO button components
  // TODO focus styles
  // TODO Nav
  import "neutral-ui/base.css";
  import ControlPanel from "./lib/components/ControlPanel.svelte";
  import Squiggle from "./lib/components/Squiggle.svelte";
  import Toasts from "./lib/components/Toasts.svelte";

  let svgContainer: HTMLElement;
  // let frequency = 8;
</script>

<main
  class="flex portrait:flex-col landscape:flex-row gap-4 p-2 xs:px-8 xl:px-16 w-screen h-screen landscape:overflow-hidden"
>
  <section
    bind:this={svgContainer}
    class="flex flex-col justify-center items-center grow p-8"
  >
    <Squiggle />
  </section>

  <section class="landscape:flex landscape:items-center">
    <ControlPanel {svgContainer} />
  </section>
</main>

<Toasts />
