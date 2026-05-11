import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";

function Navbar() {
  const { layout, setLayout, setIsCollapsed, tasks } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      navigate("/");
    }
    const foundTask = tasks.find((t) =>
      t.task.toLowerCase().includes(term.toLowerCase()),
    );
    if (!foundTask) return;
    const taskDate = new Date(foundTask.Date);
    const todayDate = new Date();

    todayDate.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);

    if (foundTask.deleted) {
      navigate("/Trash");
    } else if (taskDate < todayDate) {
      navigate("/PendingTasks");
    } else if (taskDate === todayDate) {
      navigate("/Today");
    } else {
      navigate("/AddTask");
    }
  };
  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <button
          style={styles.menu}
          onClick={() => {
            setIsCollapsed((prev) => !prev);
          }}
        >
          ☰
        </button>

        <h2 style={styles.logo}>TO DO</h2>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          style={styles.search}
        />
      </div>

      <div style={styles.right}>
        <button
          style={styles.btn}
          onClick={() =>
            setLayout((prev) => (prev === "list" ? "grid" : "list"))
          }
        >
          <img
            src="https://res.cloudinary.com/dix0tr5gb/image/upload/v1777453825/875076_pflwfv.png"
            alt="grid-icon"
            style={styles.layout}
          />
          <span>{layout === "list" ? " Grid" : "List"}</span>
        </button>
        
        <img
          src="https://res.cloudinary.com/dix0tr5gb/image/upload/v1777452813/setting-icon-614x460_jxfejg.png"
          alt="setting-icon"
          style={styles.icon}
        />
        <span style={styles.profile}>M</span>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#202124",
    padding: "10px 20px",
    color: "white",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "15px",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  menu: {
    fontSize: "20px",
    cursor: "pointer",
  },
  layout: {
    height: "24px",
    width: "24px",
    cursor: "pointer",
    padding: "5px",
  },
  logo: {
    margin: 0,
  },

  searchContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },

  search: {
    width: "60%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    backgroundColor: "#303134",
    color: "white",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  icon: {
    cursor: "pointer",
    height: "50px",
    width: "60px",
  },

  profile: {
    backgroundColor: "#8ab4f8",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
};

export default Navbar;
