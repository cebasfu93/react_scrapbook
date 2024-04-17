import { Link } from "react-router-dom";
const Missing = () => {
  return (
    <main className="Missing">
      <h2>Page Not Found</h2>
      <p>Weel, that's disappointing.</p>
      <p>
        <Link to="/">Visit Our Homepage</Link>
      </p>
      <h1>Missing</h1>
    </main>
  );
};

export default Missing;
