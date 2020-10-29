import { localization } from "../localization";
import { language } from "./language";
import { derived } from "svelte/store";

export const loc = derived(language, ($language) => {
  let locObj = {};
  for (let key in localization) {
    locObj[key] = localization[key][$language];
  }
  return locObj;
});
