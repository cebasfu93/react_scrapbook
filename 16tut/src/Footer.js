const Footer = () => {
  /**
   * Component to display in the footer of the app.
   */
  const today = new Date(); // Get the current datetime
  return (
    <footer className="Footer">
      <p>Copyright &copy; {today.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
