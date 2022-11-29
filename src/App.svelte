<script>
  //@ts-nocheck
  // TODO Toast
  // TODO button components
  // TODO focus styles
  // TODO Typescript

  import BaseRadioGroup from "@components/BaseRadioGroup.svelte";
  import BaseRangeSlider from "./lib/components/BaseRangeSlider.svelte";
  import BaseSwitch from "./lib/components/BaseSwitch.svelte";
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
  const randomOptions = [
    { val: false, text: "D" },
    { val: true, text: "R" },
  ];

  let orientation = "default";
  const orientationOptions = [
    { val: "default", text: "↓" },
    { val: "flipped", text: "↑" },
  ];
  const orientProps = { label: "Orientation", options: orientationOptions };

  let strokeCap = "round";
  const strokeCapOptions = [
    { val: "round", text: "●" },
    { val: "butt", text: "■" },
  ];
  const capProps = { label: "Stroke Style", options: strokeCapOptions };

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
  }

  function copySVG() {
    const svg = svgContainer.innerHTML;
    navigator.clipboard.writeText(svg);
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
                fill-rule="evenodd"
                d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                clip-rule="evenodd"
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
          class="grow text-center bg-gray-50 dark:bg-gray-800 hover:bg-cyan-300 dark:hover:bg-brand rounded-full border border-gray-800/10 dark:border-gray-100/10 p-3 transition-colors ease-out"
        >
          Copy SVG
        </button>
        <button
          on:click={downloadSVG}
          class="grow text-center bg-gray-50 dark:bg-gray-800 hover:bg-cyan-300 dark:hover:bg-brand rounded-full border border-gray-800/10 dark:border-gray-100/10 p-3 transition-colors ease-out"
        >
          Download
        </button>
      </div>
    </div>
  </section>
</main>
