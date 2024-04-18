import { useEffect, useState } from "react";

const useWindowSize = () => {
  /**
   * Custom hook to get the window width and height.
   */
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      /**
       * Sets the windowSize state to the current window width and height.
       */
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();

    // listens to the resize event and executes the handleResize function when the window is resized
    // a way of making the hook dependent on an event instead of a state
    window.addEventListener("resize", handleResize);

    // removes the event listener when the component is unmounted (this avoids memory leaks)
    const cleanUp = () => {
      /**
       * The cleanUp function is called when the component is unmounted or when the dependency changes.
       * This function removes the event listener to avoid memory leaks.
       */
      console.log("runs if a useEffect dependency changes");
      window.removeEventListener("resize", handleResize);
    };
    return cleanUp;

    // alternatively, we can remove the event listener with an anonymous function
    // return () => window.removeEventListener("resize", handleResize);
  }, []); // run without state dependencies
  return windowSize;
};

export default useWindowSize;
