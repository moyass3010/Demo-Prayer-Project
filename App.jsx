import "./App.css";
import MainContent from "./Components/MainContent";
import { Container, Switch, FormControlLabel } from "@mui/material";
import { useState, useEffect } from "react";







function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <>

{/* added dark and light mode */}
 <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "125vh",
        background: darkMode
          ? "linear-gradient(135deg, #1f2937, #0a0f18ff)"
          : "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
        minHeight: "100vh",
        transition: "all 0.4s ease",
      }}
    >
        <div style={{ position: "fixed", top: "20px", right: "20px" }}>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              color="primary"
            />
          }
          label={darkMode ? "🌙 Dark" : "☀️ Light"}
          style={{ color: darkMode ? "white" : "black" }}
        />
      </div>
       <Container
        maxWidth="lg"
        style={{ marginTop: "40px", color: darkMode ? "white" : "black" }}
      >
        <MainContent />
      </Container>
    </div>
{/*  */}
    </>
  );
}

export default App;
