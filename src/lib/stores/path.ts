import { writable } from "svelte/store";
import OrientationDefault from "../icons/OrientationDefault.svelte";
import OrientationFlipped from "../icons/OrientationFlipped.svelte";
import CapRound from "../icons/CapRound.svelte";
import CapSquare from "../icons/CapSquare.svelte";
import type { OrientationVal, RadioOption, StrokeCapVal } from "../types/app";
import { getRandom } from "../utils/math";

export let orientation = writable<OrientationVal>("default");
const orientationOptions: RadioOption[] = [
  { val: "default", component: OrientationDefault },
  { val: "flipped", component: OrientationFlipped },
];
export const orientProps = {
  label: "Orientation",
  options: orientationOptions,
};

export let strokeCap = writable<StrokeCapVal>("round");
const strokeCapOptions: RadioOption[] = [
  { val: "round", component: CapRound },
  { val: "butt", component: CapSquare },
];
export const capProps = {
  label: "Stroke Style",
  options: strokeCapOptions,
};
export const strokeColor = "#1761ff";

export let frequency = writable(8);
export const freqProps = {
  min: 2,
  max: 20,
  step: 1,
  bigStep: 2,
  label: "Frequency",
};

export let amplitude = writable(0.5);
export const ampProps = {
  min: 0,
  max: 1,
  step: 0.01,
  bigStep: 0.1,
  label: "Amplitude",
  counter: "percentage",
};

export let flow = writable(13.6619772367581);
export const flowProps = {
  min: -220,
  max: 240,
  step: 0.1,
  bigStep: 10,
  label: "Flow",
  counter: "percentage",
};

export let strokeWeight = writable(4);
export const strokeProps = {
  min: 1,
  max: 10,
  step: 0.1,
  bigStep: 1,
  label: "Weight",
  counter: "decimal",
};

export let isRandom = writable(false);
export let random = writable(getRandom(freqProps.max * 2 - 2, 0.2));
