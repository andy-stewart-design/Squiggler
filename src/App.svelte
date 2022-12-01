<script>
  //@ts-nocheck
  // TODO Nav
  // TODO Check light theme
  // -------------
  // TODO button components
  // TODO focus styles
  // TODO break up main app into components
  // TODO
  // TODO Typescript

  import BaseRadioGroup from "@components/BaseRadioGroup.svelte";
  import BaseRangeSlider from "./lib/components/BaseRangeSlider.svelte";
  import BaseSwitch from "./lib/components/BaseSwitch.svelte";
  import Toasts from "./lib/components/Toasts.svelte";
  import CapRound from "./lib/icons/CapRound.svelte";
  import CapSquare from "./lib/icons/CapSquare.svelte";
  import OrientationDefault from "./lib/icons/OrientationDefault.svelte";
  import OrientationFlipped from "./lib/icons/OrientationFlipped.svelte";
  import { addToast } from "./lib/stores/toasts";
  import { getRandom } from "@utils/math";

  let svgContainer;

  const size = 400;
  const center = size / 2;
  const offset = 20;

  let strokeWeight = 3;
  const strokeProps = {
    min: 1,
    max: 10,
    step: 0.1,
    step: 0.1,
    bigStep: 1,
    label: "Weight",
    counter: "decimal",
  };

  let frequency = 8;
  const freqProps = {
    min: 2,
    max: 20,
    step: 1,
    bigStep: 2,
    label: "Frequency",
  };

  let amplitude = 0.5;
  const ampProps = {
    min: 0,
    max: 1,
    step: 0.01,
    bigStep: 1,
    label: "Amplitude",
    counter: "percentage",
  };

  let flow = 13.6619772367581;
  const flowProps = {
    min: -220,
    max: 240,
    step: 0.1,
    bigStep: 10,
    label: "Flow",
    counter: "percentage",
  };

  let isRandom = false;

  let orientation = "default";
  const orientationOptions = [
    { val: "default", text: OrientationDefault },
    { val: "flipped", text: OrientationFlipped },
  ];
  const orientProps = {
    label: "Orientation",
    options: orientationOptions,
    icon: true,
  };

  let strokeCap = "round";
  const strokeCapOptions = [
    { val: "round", text: CapRound },
    { val: "butt", text: CapSquare },
  ];
  const capProps = {
    label: "Stroke Style",
    options: strokeCapOptions,
    icon: true,
  };

  const getCoordX = (f, i) => (size / f) * i + offset;
  const getCoordY = (i) => center + center * i + offset;

  let random = getRandom(freqProps.max * 2 - 2, 0.2);

  function createPoints(fr, a, o, fl, isR, r) {
    if (a <= ampProps.min) {
      return `M ${offset} ${center + offset} l ${size} ${0}`;
    }

    const handleCount = fr * 2 - 2;
    const dir = o === "default" ? 1 : -1;
    const curveModifier = fl / fr;

    const points = [];
    let iterations = 0;

    for (let i = 1; i < handleCount; i += 1) {
      let posY;
      const isEven = iterations % 2 === 0;
      if (isEven && isR) posY = a * dir * r[i];
      else if (!isEven && isR) posY = -a * dir * r[i];
      else if (isEven && !isR) posY = a * dir;
      else posY = -a * dir;

      if (i === 1) {
        const midPoint = getCoordX(handleCount, 1);
        const point = `M ${getCoordX(handleCount, 0)} ${getCoordY(-posY)}
                       C ${midPoint + curveModifier}  ${getCoordY(-posY)}
                         ${midPoint - curveModifier}  ${getCoordY(posY)}
                         ${getCoordX(handleCount, 2)} ${getCoordY(posY)}`;
        points.push(point);
        iterations++;
      } else if (i > 1 && i % 2 === 0) {
        const midPoint = getCoordX(handleCount, i + 1);
        const point = `S ${midPoint - curveModifier} ${getCoordY(posY)}
                         ${getCoordX(handleCount, i + 2)} ${getCoordY(posY)}`;
        points.push(point);
        iterations++;
      }
    }

    return points.join(" ");
  }

  $: pathData = createPoints(
    frequency,
    amplitude,
    orientation,
    flow,
    isRandom,
    random
  );

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
    addToast({ message: "Check your downloads" });
  }

  function copySVG() {
    const svg = svgContainer.innerHTML;
    navigator.clipboard.writeText(svg);
    addToast({ message: "Copied to clipboard" });
  }
</script>

<main
  class="flex portrait:flex-col landscape:flex-row gap-4 p-8 xl:px-16 w-screen h-screen landscape:overflow-hidden"
>
  <section
    bind:this={svgContainer}
    class="flex flex-col justify-center items-center grow p-8"
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
    </svg>
  </section>

  <section class="landscape:flex landscape:items-center">
    <div
      class="flex flex-col gap-6 font-medium text-sm p-6 bg-gray-100 dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 rounded-2xl shadow-2xl min-w-[320px]"
    >
      <div class="flex flex-col gap-4">
        <BaseRadioGroup bind:value={orientation} {...orientProps} />
        <BaseRadioGroup bind:value={strokeCap} {...capProps} />
        <div class="flex gap-2">
          <BaseSwitch bind:value={isRandom} />
          <button
            on:click={() => (random = getRandom(freqProps.max * 2 - 2, 0.2))}
            class="p-1"
            class:opacity-25={!isRandom}
            disabled={!isRandom}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                d="M2 7H1C1 7.55228 1.44772 8 2 8V7ZM3.07026 6L3.75297 6.73068L3.8615 6.62929L3.93586 6.50073L3.07026 6ZM18 13H19C19 12.4477 18.5523 12 18 12L18 13ZM10 18L10 17L10 18ZM16.9297 14L16.247 13.2693L16.1385 13.3707L16.0641 13.4993L16.9297 14ZM8 6H2V8H8V6ZM3 7V1H1V7H3ZM10 3C13.866 3 17 6.13401 17 10H19C19 5.02944 14.9706 1 10 1V3ZM3.93586 6.50073C5.14771 4.40581 7.41027 3 10 3V1C6.66747 1 3.75928 2.81178 2.20465 5.49927L3.93586 6.50073ZM2.38754 5.26932L1.31728 6.26932L2.68272 7.73068L3.75297 6.73068L2.38754 5.26932ZM12 14L18 14L18 12L12 12L12 14ZM17 13V19H19V13H17ZM10 17C6.13401 17 3 13.866 3 10L1 10C1 14.9706 5.02944 19 10 19L10 17ZM16.0641 13.4993C14.8523 15.5942 12.5897 17 10 17L10 19C13.3325 19 16.2407 17.1882 17.7953 14.5007L16.0641 13.4993ZM17.6125 14.7307L18.6827 13.7307L17.3173 12.2693L16.247 13.2693L17.6125 14.7307Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="border-t border-black/10 dark:border-gray-100/10" />
      <div class="flex flex-col gap-3">
        <BaseRangeSlider bind:value={frequency} {...freqProps} />
        <BaseRangeSlider bind:value={amplitude} {...ampProps} />
        <BaseRangeSlider bind:value={strokeWeight} {...strokeProps} />
        <BaseRangeSlider bind:value={flow} {...flowProps} />
      </div>
      <div class="border-t border-black/10 dark:border-gray-100/10" />
      <div class="flex gap-3">
        <button
          on:click={copySVG}
          class="grow text-center bg-gray-50 dark:bg-gray-700 hover:bg-cyan-300 dark:hover:bg-brand rounded-full border border-gray-800/10 dark:border-gray-100/10 p-3 transition-colors ease-out"
        >
          Copy SVG
        </button>
        <button
          on:click={downloadSVG}
          class="grow text-center bg-gray-50 dark:bg-gray-700 hover:bg-cyan-300 dark:hover:bg-brand rounded-full border border-gray-800/10 dark:border-gray-100/10 p-3 transition-colors ease-out"
        >
          Download
        </button>
      </div>
    </div>
  </section>
</main>
<Toasts />
