import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CalendarView from "./components/CalendarView";
import PostModal from "./components/PostModal";
import "./App.css";

function App() {
  const posts = useSelector((state) => state.posts.posts);

  const [selectedPost, setSelectedPost] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [optimized, setOptimized] = useState(true);

  const handleSelectPost = useCallback((post) => {
    setSelectedPost(post);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPost(null);
    setShowAddModal(false);
  }, []);

  const handleAddPost = useCallback(() => {
    setShowAddModal(true);
  }, []);

  const scheduledPosts = useMemo(() => {
    return posts.filter((post) => post.start).length;
  }, [posts]);

  const upcomingPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, 2);
  }, [posts]);

  return (
    <div className={`scheduler-app ${darkMode ? "dark-mode" : ""}`}>
      <header className="top-header">
        <div className="brand-section">
          <div className="brand-icon">✦</div>

          <div>
            <div className="eyebrow">CONTENT PLANNING</div>
            <h1>Social Scheduler</h1>
          </div>
        </div>

        <div className="header-actions">
          <div className="drag-tip">
            Drag posts to find better publishing windows.
          </div>

          <button
            className="dark-button"
            onClick={() => setDarkMode((value) => !value)}
          >
            {darkMode ? "☀ Light" : "☾ Dark"}
          </button>
        </div>
      </header>

      <main className="dashboard">
        <section className="main-column">
          <section className="optimization-card">
            <div className="optimization-top">
              <div>
                <div className="section-label">REACT RENDERING</div>
                <h2>Optimized</h2>
              </div>

              <div className="optimization-actions">
                <button
                  className={`toggle-button ${
                    optimized ? "active" : ""
                  }`}
                  onClick={() => setOptimized((value) => !value)}
                >
                  <span className="toggle-circle"></span>
                  {optimized ? "Optimized" : "Standard"}
                </button>

                <button
                  className="reset-button"
                  onClick={() => setOptimized(true)}
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="render-stats">
              <div className="render-stat">
                <strong>5</strong>
                <span>CalendarView renders</span>
              </div>

              <div className="render-stat">
                <strong>3</strong>
                <span>Calendar renders</span>
              </div>

              <div className="render-stat">
                <strong>8</strong>
                <span>Event renders</span>
              </div>

              <div className="render-stat">
                <strong>0</strong>
                <span>Post modal renders</span>
              </div>
            </div>

            <div className="render-footer">
              <span>Sidebar renders: 1</span>
              <span>Total tracked renders: 17</span>
            </div>

            <p className="render-description">
              Change the calendar, drag a post, open a post, or switch views
              to observe rendering activity.
            </p>
          </section>

          <section className="calendar-card">
            <div className="calendar-heading">
              <div>
                <h2>September 2026</h2>
                <p>{scheduledPosts} posts in your content plan</p>
              </div>
            </div>

            <div className="calendar-wrapper">
              <CalendarView
  onSelectPost={handleSelectPost}
  onAddPost={handleAddPost}
/>
            </div>
          </section>
        </section>

        <aside className="sidebar">
          <section className="preference-card">
            <div className="sidebar-heading">
              <span>SCHEDULE PREFERENCE</span>
              <strong>--</strong>
            </div>

            <div className="preference-line"></div>

            <p>Drag a post to see how preferable its new time is.</p>

            <div className="sidebar-divider"></div>

            <div className="upcoming-heading">
              <h3>Upcoming posts</h3>
              <span>{upcomingPosts.length}</span>
            </div>

            <div className="status-grid">
              <div>
                <strong>1</strong>
                <span>DRAFTS</span>
              </div>

              <div>
                <strong>{scheduledPosts}</strong>
                <span>SCHEDULED</span>
              </div>

              <div>
                <strong>0</strong>
                <span>LIVE</span>
              </div>
            </div>

            <div className="upcoming-list">
              {upcomingPosts.map((post) => (
                <button
                  className="upcoming-post"
                  key={post.id}
                  onClick={() => handleSelectPost(post)}
                >
                  <div className="post-title-row">
                    <span className="post-dot"></span>
                    <strong>{post.title}</strong>
                  </div>

                  <span className="post-meta">
                    {post.platform} /{" "}
                    {new Date(post.start).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                    ,{" "}
                    {new Date(post.start).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  <span className="scheduled-label">Scheduled</span>
                </button>
              ))}
            </div>
          </section>
        </aside>
      </main>

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={handleCloseModal}
        />
      )}

      {showAddModal && (
        <PostModal
          post={null}
          onClose={handleCloseModal}
        />
      )}

      <button className="floating-new-post" onClick={handleAddPost}>
        + New post
      </button>
    </div>
  );
}

export default App;