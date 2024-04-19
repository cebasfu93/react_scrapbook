import { action, computed, createStore, thunk } from "easy-peasy";
import api from "./api/posts";

export default createStore({
  // define one property in the store for each state variable.
  // each of those properties need an associated action to update the state. This plays the role of the property setter.
  posts: [],
  setPosts: action((state, payload) => {
    state.posts = payload;
  }),
  postTitle: "",
  setPostTitle: action((state, payload) => {
    state.postTitle = payload;
  }),
  postBody: "",
  setPostBody: action((state, payload) => {
    state.postBody = payload;
  }),
  editTitle: "",
  setEditTitle: action((state, payload) => {
    state.editTitle = payload;
  }),
  editBody: "",
  setEditBody: action((state, payload) => {
    state.editBody = payload;
  }),
  search: "",
  setSearch: action((state, payload) => {
    state.search = payload;
  }),
  searchResults: [],
  setSearchResults: action((state, payload) => {
    state.searchResults = payload;
  }),
  // computed properties are derived from the state of the store.
  // these are similary to property attributes in a Python class.
  postCount: computed((state) => state.posts.length),
  getPostById: computed((state) => {
    return (id) => state.posts.find((post) => post.id.toString() === id);
  }),
  // thunk actions are used to perform async operations
  savePost: thunk(async (actions, newPost, helpers) => {
    const { posts } = helpers.getState(); // fetches the "posts" variable from the store
    try {
      const response = await api.post("/posts", newPost);
      // update the posts
      actions.setPosts([...posts, response.data]);
      // reset form fields
      actions.setPostTitle("");
      actions.setPostBody("");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),
  deletePost: thunk(async (actions, id, helpers) => {
    const { posts } = helpers.getState();
    try {
      await api.delete(`/posts/${id}`);
      // update the posts and navigate to the home page
      actions.setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),
  editPost: thunk(async (actions, updatedPost, helpers) => {
    const { posts } = helpers.getState();
    const { id } = updatedPost;
    try {
      // override an entry in the server with the updated post
      const response = await api.put(`/posts/${id}`, updatedPost);
      // the updated post is in response.data
      // update the posts with their original values except for the post with the given id, which is updated
      actions.setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      // reset editing fields
      actions.setEditTitle("");
      actions.setEditBody("");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),
});
