/**
     {
         "api":1,
         "name":"Decode short-UUID",
         "description":"Decodes a base-58 encoded short-uuid into a UUID",
         "author":"nbarnett",
         "icon":"circle.grid.2x1.left.filled",
         "tags":"decode,uuid,short,id"
     }
 **/

/** @typedef {import("./types").State} State */

const { decode } = require("lib/shortUuid");

/**
 * @param {State} state
 */
function main(state) {
  const input = state.text;

  try {
    const uuid = decode(input.trim());
    state.text = uuid;
  } catch {
    state.postError("Invalid short-uuid");
  }
}
