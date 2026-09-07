import { createSelector } from "@reduxjs/toolkit";

const selectPosts = (state) => state.posts.posts;

export const selectTotalPosts = createSelector(
  [selectPosts],
  (posts) => posts.length
);

export const selectPublishedPosts = createSelector(
  [selectPosts],
  (posts) => posts.filter((post) => post.status === "published")
);

export const selectDraftPosts = createSelector(
  [selectPosts],
  (posts) => posts.filter((post) => post.status === "draft")
);

export const selectInstagramPosts = createSelector(
  [selectPosts],
  (posts) => posts.filter((post) => post.platform === "Instagram")
);

export const selectPostStatistics = createSelector(
  [selectPosts],
  (posts) => ({
    total: posts.length,
    published: posts.filter(
      (post) => post.status === "published"
    ).length,
    drafts: posts.filter(
      (post) => post.status === "draft"
    ).length,
    instagram: posts.filter(
      (post) => post.platform === "Instagram"
    ).length,
  })
);

export const selectFilteredPosts = createSelector(
  [selectPosts, (_, searchTerm) => searchTerm],
  (posts, searchTerm) => {
    const search = searchTerm.toLowerCase();

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search) ||
        post.content.toLowerCase().includes(search) ||
        post.platform.toLowerCase().includes(search)
    );
  }
);