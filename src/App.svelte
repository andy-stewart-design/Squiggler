<script>
  // @ts-nocheck

  // TODO Toast
  // TODO slider component
  // TODO button components
  // TODO focus styles
  // TODO Typescript

  import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "neutral-ui";
  import RangeSlider from "@components/RangeSlider.svelte";

  let svgContainer;

  const size = 400;
  const offset = 20;
  const cY = size / 2;
  let strokeWeight = 3;
  let strokeCap = "round";
  let frequency = 3;
  const ampSteps = 12;
  const ampMin = size / ampSteps;
  let amplitude = 6;
  let flowiness = 13.6619772367581;
  let flip = "default";

  function createPoints(freq, amp, flowiness, orientation) {
    const relAmp = ampMin * amp;
    const handleCount = size / (freq * 2);
    const curveModifier = (flowiness / freq) * -1;
    const initBez = Math.floor(handleCount - curveModifier);
    const addBez = Math.ceil(handleCount + curveModifier);

    if (relAmp <= 0) {
      return `M ${offset} ${cY + offset} l ${size} ${0}`;
    }

    let dir = orientation === "flipped" ? -1 : 1;

    const point0 = `M ${offset} ${cY + offset - (relAmp / 2) * dir}`;
    let point1;

    if (flowiness <= -200) {
      point1 = `l ${size / freq} ${relAmp * dir}`;
    } else {
      point1 = `c ${initBez} ${0} ${addBez} 
        ${relAmp * dir} 
        ${size / freq} ${relAmp * dir}`;
    }

    const count = freq - 1;
    const points = [point0, point1];
    for (let i = 0; i < count; i++) {
      dir *= -1;
      if (flowiness <= -200) {
        const point = `l ${size / freq} ${relAmp * dir}`;
        points.push(point);
      } else {
        const point = `s ${addBez} ${relAmp * dir} 
          ${size / freq} ${relAmp * dir}`;
        points.push(point);
      }
    }

    return points.join(" ");
  }

  $: pathData = createPoints(frequency, amplitude, flowiness, flip);

  function downloadSVG() {
    const svg = svgContainer.innerHTML;
    const filetype = "data:image/svg+xml;charset=utf-8,";

    const element = document.createElement("a");
    element.setAttribute("href", filetype + encodeURIComponent(svg));
    element.setAttribute("download", "squiggle.svg");
    element.setAttribute("download", "squiggle.svg");
    element.style.display = "none";

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function copySVG() {
    const svg = svgContainer.innerHTML;
    navigator.clipboard.writeText(svg);
  }

  const orientationOptions = [
    { val: "default", text: "↓" },
    { val: "flipped", text: "↑" },
  ];
  const strokeCapOptions = [
    { val: "round", text: "●" },
    { val: "butt", text: "■" },
  ];
</script>

<main
  class="flex portrait:flex-col landscape:flex-row gap-4 p-8 xl:px-16 w-screen h-screen overflow-hidden"
>
  <section
    bind:this={svgContainer}
    class="flex justify-center items-center grow p-8"
  >
    <svg
      class="w-full max-w-[90vh]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 {size + offset * 2} {size + offset * 2}"
    >
      <path
        d={pathData}
        id="wave"
        fill="none"
        stroke="currentColor"
        stroke-width={strokeWeight}
        stroke-linecap={strokeCap}
        stroke-linejoin="round"
      />
      <!-- <path
        d="M10 10 l 200 100"
        fill="none"
        stroke="currentColor"
        stroke-width={strokeWeight}
        stroke-linecap={strokeCap}
      /> -->
      <!-- style="stroke-dasharray: 0 20 520 300; stroke-dashoffset: 1;" -->
    </svg>
  </section>

  <section class="landscape:flex landscape:items-center">
    <div
      class="flex flex-col gap-6 font-medium text-sm p-6 bg-gray-100 dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/5 rounded-2xl shadow-2xl min-w-[300px]"
    >
      <div class="flex gap-3">
        <RadioGroup bind:value={flip} class="flex grow">
          <RadioGroupLabel>Squiggle Orientation</RadioGroupLabel>
          {#each orientationOptions as option, index}
            <RadioGroupOption
              value={option.val}
              {index}
              let:checked
              class="grow bg-gray-200 dark:bg-gray-700 border border-gray-800/10 dark:border-gray-100/10 hover:bg-cyan-300/50 dark:hover:bg-blue-600/50 first-of-type:rounded-l-full last-of-type:rounded-r-full last-of-type:border-l-0 overflow-hidden focus-visible:z-10"
            >
              <p
                class="text-center p-3 transition-colors ease-out"
                class:checked
              >
                {option.text}
              </p>
            </RadioGroupOption>
          {/each}
        </RadioGroup>
        <RadioGroup bind:value={strokeCap} class="flex grow">
          <RadioGroupLabel>Stroke Cap Style</RadioGroupLabel>
          {#each strokeCapOptions as option, index}
            <RadioGroupOption
              value={option.val}
              {index}
              let:checked
              class="grow bg-gray-200 dark:bg-gray-700 border border-gray-800/10 dark:border-gray-100/10 hover:bg-cyan-300/50 dark:hover:bg-blue-600/50 first-of-type:rounded-l-full last-of-type:rounded-r-full last-of-type:border-l-0 overflow-hidden focus-visible:z-10"
            >
              <p
                class="text-center p-3 transition-colors ease-out"
                class:checked
              >
                {option.text}
              </p>
            </RadioGroupOption>
          {/each}
        </RadioGroup>
      </div>
      <RangeSlider
        bind:value={frequency}
        name="frequency"
        min="1"
        max="12"
        step="1"
        counter="value"
      >
        Frequency
      </RangeSlider>
      <RangeSlider
        bind:value={amplitude}
        name="amplitude"
        min="0"
        max={ampSteps}
        step="0.1"
      >
        Size
      </RangeSlider>
      <RangeSlider
        bind:value={strokeWeight}
        name="stroke-weight"
        min="1"
        max="10"
        step="0.1"
        counter="value"
      >
        Weight
      </RangeSlider>
      <RangeSlider
        bind:value={flowiness}
        name="flowiness"
        min="-200"
        max="220"
        step="0.1"
      >
        Flow
      </RangeSlider>
      <div class="flex gap-3 pt-2">
        <button
          on:click={copySVG}
          class="grow text-center bg-gray-50 dark:bg-gray-700 hover:bg-cyan-300 dark:hover:bg-blue-600/60 rounded-full border border-gray-800/10 dark:border-gray-100/10 p-3 transition-colors ease-out"
        >
          Copy SVG
        </button>
        <button
          on:click={downloadSVG}
          class="grow text-center bg-gray-50 dark:bg-gray-700 hover:bg-cyan-300 dark:hover:bg-blue-600/60 rounded-full border border-gray-800/10 dark:border-gray-100/10 p-3 transition-colors ease-out"
        >
          Download
        </button>
      </div>
    </div>
  </section>
</main>

<style>
  .checked {
    @apply bg-cyan-400 dark:bg-blue-600;
  }
</style>
