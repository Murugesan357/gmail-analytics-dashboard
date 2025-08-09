import { useUser } from "../context/useContext";
import "../styles/styles.css";

const Header = ({ setActiveView }) => {
  const { user, updateUser } = useUser();

  const handleLogOut = (e) => {
    e.preventDefault();
    setActiveView("dashboard");
    updateUser(null);
    localStorage.removeItem("user");
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title">Gmail Analytics</h1>
        </div>
        <div className="header-right">
          <div className="user-profile">
            <img
              src={user?.imageUrl}
              alt="User"
              className="user-avatar"
            />
            <span className="user-name">{user?.name}</span>
          </div>
          <button
            id="logoutBtn"
            className="btn btn--outline btn--sm"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
