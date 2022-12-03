import type { SvelteComponent } from "svelte";
import type { Value } from "neutral-ui/radio-group/types";

export type OrientationVal = "default" | "flipped";
export type StrokeCapVal = "round" | "butt" | "square" | "inherit";

export interface RadioOption {
  val: Value;
  text?: string | undefined;
  component?: typeof SvelteComponent;
}

export interface Toast {
  message: string;
  id?: string;
  type?: string;
  dismissible?: boolean;
  timeout?: number;
}
