/**
     {
         "api":1,
         "name":"Encode short-UUID",
         "description":"Encodes a UUID into a base-58 encoded short-uuid",
         "author":"nbarnett",
         "icon":"circle.grid.2x1.right.filled",
         "tags":"encode,uuid,short,id"
     }
 **/

/** @typedef {import("./types").State} State */

const { encode } = require("lib/shortUuid");

/**
 * @param {State} state
 */
function main(state) {
  const input = state.text;

  try {
    const uuid = encode(input.trim());
    state.text = uuid;
  } catch {
    state.postError("Invalid uuid");
  }
}
