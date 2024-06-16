const flickrBase58 =
  "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";

const hex = "0123456789abcdef";

/**
 * Asserts that the input is truthy
 * @param {boolean} input
 * @returns {void}
 */
function assert(input) {
  if (!input) {
    throw new Error("Assertion failed");
  }
}

/**
 * Converts an input from one base to another
 * @param {string} input
 * @param {string} srcAlphabet
 * @param {string} dstAlphabet
 * @returns {string}
 */
function convert(input, srcAlphabet, dstAlphabet) {
  // We have to implement the conversion using "long division" since
  // converting it first to an int could result in integer overflow
  const fromBase = srcAlphabet.length;
  const toBase = dstAlphabet.length;

  // First, convert the input chars to the number representations
  const inputArr = [];
  for (let i = 0; i < input.length; i++) {
    const val = srcAlphabet.indexOf(input[i]);
    assert(val !== -1);
    inputArr[i] = val;
  }

  // Then, divide the input by the fromBase repeatedly, until it reaches 0.
  // The remainder from each division becomes a character in the output.
  let result = [];
  let divisor = inputArr;
  do {
    let dividend = 0;
    let quotient = [];
    for (let i = 0; i < divisor.length; i++) {
      dividend = dividend * fromBase + divisor[i];
      if (dividend >= toBase) {
        quotient.push(Math.floor(dividend / toBase));
        dividend = dividend % toBase;
      } else if (quotient.length > 0) {
        quotient.push(0);
      }
    }

    const val = dstAlphabet[dividend];
    assert(val !== undefined);
    result.unshift(val);

    divisor = quotient;
  } while (divisor.length > 0);

  const output = result.join("");

  return output;
}

/**
 * Takes a UUID and encodes it into a base-58 short id
 * @param {string} uuid
 * @returns {string}
 */
function encode(uuid) {
  const processedUuid = uuid.toLowerCase().replace(/-/g, "");
  const shortId = convert(processedUuid, hex, flickrBase58);

  return shortId;
}

/**
 * Takes a base-58 short id and decodes it into a UUID
 * @param {string} shortId
 * @returns {string}
 */
function decode(shortId) {
  const rawUuid = convert(shortId, flickrBase58, hex);
  const paddedUuid = rawUuid.padStart(32, "0");
  const groupings = [8, 4, 4, 4, 12];
  let startIdx = 0;
  let uuidParts = [];
  for (const grouping of groupings) {
    uuidParts.push(paddedUuid.substring(startIdx, startIdx + grouping));
    startIdx += grouping;
  }

  return uuidParts.join("-");
}

module.exports = {
  encode,
  decode,
};
