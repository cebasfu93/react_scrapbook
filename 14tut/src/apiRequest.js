const apiRequest = async (url = "", optionsObj = null, errMsg = null) => {
  /**
   * Make a CRUD request to the server.
   */
  try {
    // whether the request is PUT, POST, DELETE, or GET (i.e., the request method) is passed in the optionsObj
    const response = await fetch(url, optionsObj); // async call to the api
    if (!response.ok) throw Error("Please reload the app"); // if the request failed, throw an error
  } catch (err) {
    errMsg = err.message; // set the error message
  } finally {
    return errMsg; // return the error message (or null if there was no error)
  }
};

export default apiRequest;
