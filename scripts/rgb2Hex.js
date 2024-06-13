/**
     {
         "api":1,
         "name":"RGB to Hex",
         "description":"Convert color in RGB to hexadecimal",
         "author":"nbarnett",
         "icon":"color-wheel",
         "tags":"hex,color,rgb,convert"
     }
 **/

/** @typedef {import("./types").State} State */

/**
 * @param state {State}
 */
function main(state) {
  const rgb = state.text;

  const parts = rgb.split(/[\s,]/).filter((part) => part !== "");
  if (parts < 3) {
    state.postError("String does not contain RGB");
  }

  const [r, g, b] = parts;

  const hexValue = [r, g, b].map((s) => parseInt(s).toString(16)).join("");
  const hex = `#${hexValue}`;

  state.text = hex;
}
