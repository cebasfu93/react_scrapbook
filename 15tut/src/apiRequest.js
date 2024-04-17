const ApiRequest = async (
  setData,
  reqUrl = "",
  optionsObj = null,
  errMsg = null
) => {
  try {
    const response = await fetch(reqUrl, optionsObj);
    if (!response.ok) throw Error("Please reload the app.");
    const jsonData = await response.json();
    setData(jsonData);
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
};

export default ApiRequest;
