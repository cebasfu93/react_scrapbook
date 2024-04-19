import { useStoreState } from "easy-peasy";

const Footer = () => {
  /**
   * Component to display in the footer of the app.
   */
  const postCount = useStoreState((state) => state.postCount); // Get the number of posts in the store
  return (
    <footer className="Footer">
      <p>{postCount} Blog Posts</p>
    </footer>
  );
};

export default Footer;
