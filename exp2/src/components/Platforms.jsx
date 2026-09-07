import { useDispatch, useSelector } from "react-redux";
import {
  addPlatform,
  deletePlatform,
  togglePlatform,
} from "../features/platforms/platformsSlice";

function Platforms() {
  const platforms = useSelector(
    (state) => state.platforms.platforms
  );

  const dispatch = useDispatch();

  const handleAddPlatform = () => {
    const newPlatform = {
      id: Date.now(),
      name: "LinkedIn",
      connected: false,
    };

    dispatch(addPlatform(newPlatform));
  };

  return (
    <section className="card">
      <div className="section-header">
        <div>
          <p className="section-label">PLATFORMS</p>
          <h2>Connected Platforms</h2>
        </div>

        <button className="primary-btn" onClick={handleAddPlatform}>
          + Add Platform
        </button>
      </div>

      <div className="platform-grid">
        {platforms.map((platform) => (
          <div className="platform-card" key={platform.id}>
            <div className="platform-top">
              <div className="platform-icon">
                {platform.name.charAt(0)}
              </div>

              <div
                className={`status ${
                  platform.connected ? "connected" : "offline"
                }`}
              >
                <span></span>
                {platform.connected ? "Connected" : "Offline"}
              </div>
            </div>

            <h3>{platform.name}</h3>

            <div className="platform-actions">
              <button
                className="secondary-btn"
                onClick={() =>
                  dispatch(togglePlatform(platform.id))
                }
              >
                {platform.connected ? "Disconnect" : "Connect"}
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  dispatch(deletePlatform(platform.id))
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Platforms;