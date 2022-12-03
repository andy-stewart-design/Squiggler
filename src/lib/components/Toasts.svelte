<script lang="ts">
  import { flip } from "svelte/animate";
  import { cubicOut } from "svelte/easing";
  import Toast from "./Toast.svelte";
  import { toasts, dismissToast } from "../stores/toasts";
</script>

{#if $toasts}
  <ul
    class="fixed bottom-8 left-0 right-0 flex flex-col justify-center items-center gap-2 w-full z-50"
  >
    {#each $toasts as toast (toast.id)}
      <li animate:flip={{ duration: 300, delay: 100, easing: cubicOut }}>
        <Toast
          type={toast.type}
          dismissible={toast.dismissible}
          on:dismiss={() => dismissToast(toast.id)}
        >
          {toast.message}
        </Toast>
      </li>
    {/each}
  </ul>
{/if}
