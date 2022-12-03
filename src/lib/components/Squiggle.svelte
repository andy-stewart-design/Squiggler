<script lang="ts">
  import {
    amplitude,
    ampProps,
    flow,
    strokeWeight,
    isRandom,
    orientation,
    strokeCap,
    random,
    strokeColor,
  } from "../stores/path";
  import type { OrientationVal } from "../types/app";

  export let frequency: number;

  const size = 400;
  const center = size / 2;
  const offset = 20;

  const getCoordX = (f: number, i: number) => (size / f) * i + offset;
  const getCoordY = (i: number) => center + center * i + offset;

  function createPoints(
    _freq: number,
    _amp: number,
    _orient: OrientationVal,
    _flow: number,
    _isRand: boolean,
    _rand: number[]
  ) {
    if (_amp <= ampProps.min) {
      return `M ${offset} ${center + offset} l ${size} ${0}`;
    }

    const handleCount = _freq * 2 - 2;
    const dir = _orient === "default" ? 1 : -1;
    const curveModifier = _flow / _freq;

    const points = [];
    let iterations = 0;

    for (let i = 1; i < handleCount; i += 1) {
      let posY: number;
      const isEven = iterations % 2 === 0;
      if (isEven && _isRand) posY = _amp * dir * _rand[i];
      else if (!isEven && _isRand) posY = -_amp * dir * _rand[i];
      else if (isEven && !_isRand) posY = _amp * dir;
      else posY = -_amp * dir;

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
    $amplitude,
    $orientation,
    $flow,
    $isRandom,
    $random
  );
</script>

<svg
  class="w-full max-w-[90vh]"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 {size + offset * 2} {size + offset * 2}"
>
  <path
    d={pathData}
    id="wave"
    fill="none"
    stroke={strokeColor}
    stroke-width={$strokeWeight}
    stroke-linecap={$strokeCap}
    stroke-linejoin="round"
  />
</svg>
