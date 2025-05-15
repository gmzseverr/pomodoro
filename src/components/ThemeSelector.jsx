import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ThemeSelector({ selectedTheme, setSelectedTheme }) {
  const themesList = [
    { id: "red", color: "#ab1616" },
    { id: "dream", color: "#d76d77" },
    { id: "ocean", color: "#1cb5e0" },
    { id: "beauty", color: "#ffd3d1" },
    { id: "forest", color: "#237a57" },
  ];

  return (
    <div className="theme-selector">
      {themesList.map((theme) => (
        <button
          key={theme.id}
          className={`theme-btn ${
            selectedTheme === theme.id ? "selected" : ""
          }`}
          onClick={() => setSelectedTheme(theme.id)}
        >
          <FontAwesomeIcon
            size="2x"
            icon={faCircle}
            style={{ color: theme.color }}
          />
        </button>
      ))}
    </div>
  );
}
export default ThemeSelector;
