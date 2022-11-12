<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  export let value;

  let activeValue = writable(value);
  $: activeValue.set(value);
  $: value = $activeValue;

  const uuid = crypto.randomUUID();

  setContext("radioGroupAPI", { uuid, activeValue });
</script>

<div id={`radiogroup-${uuid}`} class="grow flex gap-0" role="radiogroup">
  <slot />
</div>
