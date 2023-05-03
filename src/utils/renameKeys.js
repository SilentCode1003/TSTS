/**
 *
 * @param {object} obj Example: const obj = { a: "1", b: "2" };
 * @param {object} newKeys Example: const newKeys = { a: "A", c: "C" };
 * @returns {object} Example: const renamedObj = renameKeys(obj, newKeys);
 */
function renameKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key
    return { [newKey]: obj[key] }
  })
  return Object.assign({}, ...keyValues)
}

export default renameKeys
