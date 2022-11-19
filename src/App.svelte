<script>
  //@ts-nocheck
  // TODO slider component
  // TODO Toast
  // TODO button components
  // TODO focus styles
  // TODO Typescript

  import RangeSlider from "@components/RangeSlider.svelte";
  import BaseRadioGroup from "@components/BaseRadioGroup.svelte";
  import { getRandom } from "@utils/math";

  let svgContainer;

  const size = 400;
  const center = size / 2;
  const offset = 20;

  let strokeWeight = 3;
  const strokeRange = { min: 1, max: 10, step: 0.1 };

  let frequency = 8;
  const freqRange = { min: 2, max: 20, step: 1 };

  let amplitude = 0.5;
  const ampRange = { min: 0, max: 1, step: 0.01 };

  let flow = 13.6619772367581;
  const flowRange = { min: -220, max: 240, step: 0.1 };

  let isRandom = false;
  const randomOptions = [
    { val: false, text: "D" },
    { val: true, text: "R" },
  ];

  let orientation = "default";
  const orientationOptions = [
    { val: "default", text: "↑" },
    { val: "flipped", text: "↓" },
  ];

  let strokeCap = "round";
  const strokeCapOptions = [
    { val: "round", text: "●" },
    { val: "butt", text: "■" },
  ];

  const getCoordX = (f, i) => (size / f) * i + offset;
  const getCoordY = (i) => center + center * i + offset;

  let random = getRandom(freqRange.max * 2 - 2, 0.2);

  function createPoints(fr, a, o, fl, isR, r) {
    if (a <= ampRange.min) {
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
  class="flex portrait:flex-col landscape:flex-row gap-4 p-8 xl:px-16 w-screen h-screen overflow-hidden"
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
      class="flex flex-col gap-6 font-medium text-sm p-6 bg-gray-100 dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/5 rounded-2xl shadow-2xl min-w-[300px]"
    >
      <div class="flex gap-3">
        <BaseRadioGroup
          bind:value={orientation}
          label="Orientation"
          options={orientationOptions}
        />
        <BaseRadioGroup
          bind:value={strokeCap}
          label="Stroke Cap Style"
          options={strokeCapOptions}
        />
      </div>
      <div class="flex gap-3">
        <BaseRadioGroup
          bind:value={isRandom}
          label="Ransomness"
          options={randomOptions}
        />
        <button
          on:click={() => (random = getRandom(freqRange.max * 2 - 2, 0.2))}
          class="grow text-center bg-gray-50 dark:bg-gray-700 hover:bg-cyan-300 dark:hover:bg-blue-600/60 rounded-full border border-gray-800/10 dark:border-gray-100/10 p-3 transition-colors ease-out"
        >
          Randomize
        </button>
      </div>
      <RangeSlider
        bind:value={frequency}
        name="frequency"
        min={freqRange.min}
        max={freqRange.max}
        step={freqRange.step}
        counter="value"
      >
        Frequency
      </RangeSlider>
      <RangeSlider
        bind:value={amplitude}
        min={ampRange.min}
        max={ampRange.max}
        step={ampRange.step}
        name="amplitude"
      >
        Size
      </RangeSlider>
      <RangeSlider
        bind:value={strokeWeight}
        min={strokeRange.min}
        max={strokeRange.max}
        step={strokeRange.step}
        name="stroke-weight"
        counter="value"
      >
        Weight
      </RangeSlider>
      <RangeSlider
        bind:value={flow}
        min={flowRange.min}
        max={flowRange.max}
        step={flowRange.step}
        name="flowiness"
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
