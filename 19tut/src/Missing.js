// import Link to set links in this component to other routes/pages/URLs
import { Link } from "react-router-dom";
const Missing = () => {
  /**
   * Component to display when a page is not found.
   */
  return (
    <main className="Missing">
      <h2>Page Not Found</h2>
      <p>Well, that's disappointing.</p>
      <p>
        <Link to="/">Visit Our Homepage</Link>
      </p>
      <h1>Missing</h1>
    </main>
  );
};

export default Missing;
