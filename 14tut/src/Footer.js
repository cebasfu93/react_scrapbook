const Footer = ({ length }) => {
  /**
   * Footer of the app. It displays the number of items in the list.
   */
  return (
    <footer>
      <p>
        {length} List {length === 1 ? "Item" : "Items"}{" "}
        {/* inline conditional to handle singular and plural */}
      </p>
    </footer>
  );
};

export default Footer;
