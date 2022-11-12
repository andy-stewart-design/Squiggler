<script>
  import { getContext } from "svelte";

  const { uuid } = getContext("radioGroupAPI");
</script>

<label
  id={`radiogroup-${uuid}-label`}
  for={`radiogroup-${uuid}`}
  class="sr-only"
  role="none"
>
  <slot />
</label>
