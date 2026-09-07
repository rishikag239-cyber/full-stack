import Posts from "./components/Posts";
import Platforms from "./components/Platforms";
import Statistics from "./components/Statistics";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">
            EXP 2 • REDUX TOOLKIT
          </p>

          <h1>Social Media Manager</h1>

          <p className="subtitle">
            Centralized state management with optimized
            selectors and rendering.
          </p>
        </div>

        <div className="redux-badge">
          <span></span>
          Redux Active
        </div>
      </header>

      <main className="dashboard">
        <Statistics />

        <Platforms />

        <Posts />
      </main>

      <footer>
        React + Redux Toolkit • Memoized Selectors
      </footer>
    </div>
  );
}

export default App;