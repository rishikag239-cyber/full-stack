import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import postsReducer from "./features/posts/postsSlice";

function renderApp() {
  const store = configureStore({
    reducer: {
      posts: postsReducer,
    },
  });

  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

describe("Calendar Scheduler", () => {
  test("renders the scheduler heading", () => {
    renderApp();

    expect(
      screen.getByText("Social Media Scheduler")
    ).toBeInTheDocument();
  });

  test("shows scheduled post count", () => {
    renderApp();

    expect(
      screen.getByText("3 Scheduled Posts")
    ).toBeInTheDocument();
  });
});