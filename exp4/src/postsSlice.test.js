import { describe, expect, test } from "vitest";
import postsReducer, {
  addPost,
  deletePost,
  movePost,
} from "./features/posts/postsSlice";

describe("Posts Redux Slice", () => {
  test("adds a new post", () => {
    const initialState = { posts: [] };

    const action = addPost({
      title: "New Instagram Post",
      platform: "Instagram",
      start: new Date("2026-09-14T10:00"),
      end: new Date("2026-09-14T11:00"),
    });

    const state = postsReducer(initialState, action);

    expect(state.posts).toHaveLength(1);
    expect(state.posts[0].title).toBe("New Instagram Post");
  });

  test("deletes a post", () => {
    const initialState = {
      posts: [
        {
          id: 1,
          title: "Test Post",
          platform: "Instagram",
        },
      ],
    };

    const state = postsReducer(
      initialState,
      deletePost(1)
    );

    expect(state.posts).toHaveLength(0);
  });

  test("moves a post to a new time", () => {
    const initialState = {
      posts: [
        {
          id: 1,
          title: "Test Post",
          platform: "Instagram",
          start: new Date("2026-09-14T10:00"),
          end: new Date("2026-09-14T11:00"),
        },
      ],
    };

    const newStart = new Date("2026-09-15T14:00");
    const newEnd = new Date("2026-09-15T15:00");

    const state = postsReducer(
      initialState,
      movePost({
        id: 1,
        start: newStart,
        end: newEnd,
      })
    );

    expect(state.posts[0].start).toEqual(newStart);
    expect(state.posts[0].end).toEqual(newEnd);
  });
});