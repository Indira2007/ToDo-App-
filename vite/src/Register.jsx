import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onHandleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        // Clear the form
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const styles = {
    page: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1f1f2e", // Same dark background
      fontFamily: "Segoe UI, sans-serif",
    },

    card: {
      width: "400px",
      backgroundColor: "#27263b", // Sidebar color
      padding: "40px",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    },

    heading: {
      textAlign: "center",
      color: "#ffffff",
      marginBottom: "10px",
      fontSize: "32px",
      fontWeight: "600",
    },

    subtitle: {
      textAlign: "center",
      color: "#b9b9c9",
      marginBottom: "30px",
      fontSize: "15px",
    },

    input: {
      width: "100%",
      padding: "14px",
      marginBottom: "18px",
      backgroundColor: "#1f1f2e",
      color: "#ffffff",
      border: "1px solid #44445d",
      borderRadius: "10px",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box",
    },

    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#7C5CFF", // Purple accent
      color: "#ffffff",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "0.3s",
      marginTop: "5px",
    },

    footer: {
      textAlign: "center",
      marginTop: "20px",
      color: "#b9b9c9",
      fontSize: "14px",
    },

    link: {
      color: "#9d87ff",
      textDecoration: "none",
      fontWeight: "600",
      marginLeft: "5px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Create Account</h1>

        <p style={styles.subtitle}>Register to start managing your tasks</p>

        <form onSubmit={onHandleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#6A49F5";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#7C5CFF";
            }}
          >
            Register
          </button>
        </form>

        <div style={styles.footer}>
          Already have an account?
          <a href="/login" style={styles.link}>
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
