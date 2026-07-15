import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onHandleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
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
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate("/");
        localStorage.setItem("token", data.token);
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
      backgroundColor: "#1f1f2e",
      fontFamily: "Segoe UI, sans-serif",
    },

    card: {
      width: "400px",
      backgroundColor: "#27263b",
      padding: "40px",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
    },

    heading: {
      textAlign: "center",
      color: "#fff",
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
      color: "#fff",
      border: "1px solid #44445d",
      borderRadius: "10px",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box",
    },

    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#7C5CFF",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "0.3s",
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
        <h1 style={styles.heading}>Welcome Back</h1>

        <p style={styles.subtitle}>Login to continue managing your tasks</p>

        <form onSubmit={onHandleSubmit}>
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
            onMouseOver={(e) => (e.target.style.backgroundColor = "#6A49F5")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#7C5CFF")}
          >
            Login
          </button>
        </form>

        <div style={styles.footer}>
          Don't have an account?
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
