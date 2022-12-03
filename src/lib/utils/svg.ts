import { strokeColor } from "../stores/path";
import { addToast } from "../stores/toasts";

export function getSVG(el: HTMLElement) {
  const classRegex = /class="(.*?)(?<!\\)"/g;
  const svg = el.innerHTML;
  return svg.replace(classRegex, "").replace(strokeColor, "currentColor");
}

export function downloadSVG(el: HTMLElement) {
  const svg = getSVG(el);
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

export function copySVG(el: HTMLElement) {
  const svg = getSVG(el);
  navigator.clipboard.writeText(svg);
  addToast({ message: "Copied to clipboard" });
}
