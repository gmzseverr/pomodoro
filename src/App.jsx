import Header from "./components/Header";
import ThemeSelector from "./components/ThemeSelector";
import themes from "./themes";

import Timer from "./components/Timer";
import { useEffect, useState } from "react";

function App() {
  const [selectedTheme, setSelectedTheme] = useState("beauty");
  useEffect(() => {
    const theme = themes[selectedTheme];
    document.body.className = "";
    if (theme && theme.className) {
      document.body.classList.add(theme.className);
    } else {
      document.body.classList.add("default-theme");
    }
  }, [selectedTheme]);
  return (
    <div>
      <ThemeSelector setSelectedTheme={setSelectedTheme} />
      <Header />
      <Timer />
    </div>
  );
}

export default App;
