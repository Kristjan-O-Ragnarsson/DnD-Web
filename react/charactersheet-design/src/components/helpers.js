function fetchLoading(fetchName) {
  // Should return as: _placeholder = "loading" and _options=[{key: , text:}]
  return [
    "loading",
    [{key:`${fetchName}_loading`, text:"loading"}]
  ];
}
function fetchError(err, fetchName) {
  return [
    `Something went wrong: ${err.message}`,
    [{key:`${fetchName}_error`, text:"error"}]
  ];
}

const Helpers = { fetchLoading, fetchError };

export default Helpers;