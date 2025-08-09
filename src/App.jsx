import { useState, useEffect } from "react";
import { useUser } from "../src/context/useContext";
import Login from "./components/Login";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import DashboardView from "./pages/Dashboard";
import InboxView from "./pages/Inbox";
import AnalyticsView from "./pages/Analytics";
import TagsView from "./pages/Tags";
import AlertsView from "./pages/Alerts";
import SettingsView from "./pages/Settings";
import "./App.css";
import "./styles/styles.css";

function App() {
  const { user } = useUser();
  const [activeView, setActiveView] = useState(
    () => localStorage.getItem("activeView") || "dashboard"
  );

  useEffect(() => {
    localStorage.setItem("activeView", activeView);
  }, [activeView]);

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "inbox":
        return <InboxView />;
      case "analytics":
        return <AnalyticsView />;
      case "tags":
        return <TagsView />;
      case "alerts":
        return <AlertsView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div>
      {!user ? (
        <Login onLoginSuccess={() => setActiveView("dashboard")}  />
      ) : (
        <div className="main-app hide-vertical-scrollbar">
          <Header setActiveView={setActiveView} />
          <Sidebar activeView={activeView} onChangeView={setActiveView} />
          <div className="main-content">{renderView()}</div>
        </div>
      )}
    </div>
  );
}

export default App;
