import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const theme1 = {
  mode: "light",
  palette: {
    primary: {
      main: "#1C2F72",
      light: "#1C2F72",
      dark: "#1C2F72",
      contrastText: "#fff"
    },
    secondary: {
      main: "#1C2F72",
      light: "#1C2F72",
      dark: "#1C2F72",
      contrastText: "#fff"
    },
    error: {
      main: "#1C2F72",
      light: "#1C2F72",
      dark: "#1C2F72",
      contrastText: "#fff"
    },
    warning: {
      main: "#1C2F72",
      light: "#1C2F72",
      dark: "#1C2F72",
      contrastText: "#fff"
    },
    info: {
      main: "#1C2F72",
      light: "#1C2F72",
      dark: "#1C2F72",
      contrastText: "#fff"
    },
    success: {
      main: "#1C2F72",
      light: "#1C2F72",
      dark: "#1C2F72",
      contrastText: "#fff"
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161"
    },
    text: {
      primary: "#333",
      secondary: "#222",
      disabled: "#123456"
    }
  }
};
const theme2 = {
  mode: "light",
  palette: {
    primary: {
      main: "#000111",
      light: "#1C2F72",
      dark: "#1C2F72",
      contrastText: "#fff"
    },
    secondary: {
      main: "#1C2F72",
      light: "#1C2F72",
      dark: "#1C2F72",
      contrastText: "#fff"
    },
    error: {
      main: "#1C2F72",
      light: "#1C2F72",
      dark: "#1C2F72",
      contrastText: "#fff"
    },
    warning: {
      main: "#1C2F72",
      light: "#1C2F72",
      dark: "#1C2F72",
      contrastText: "#fff"
    },
    info: {
      main: "#1C2F72",
      light: "#1C2F72",
      dark: "#1C2F72",
      contrastText: "#fff"
    },
    success: {
      main: "#1C2F72",
      light: "#1C2F72",
      dark: "#1C2F72",
      contrastText: "#fff"
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161"
    },
    text: {
      primary: "#333",
      secondary: "#222",
      disabled: "#123456"
    }
  }
};

export const ThemeContextProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState(JSON.parse(localStorage.getItem("themeColor")) || theme1);
  const [selectedValue, setSelectedValue] = useState("default");

  const toggleThemeColor = (color) => {
    switch (color) {
      case "color1": {
        setSelectedValue("color1");
        localStorage.setItem("themeColor", JSON.stringify(theme2));
        return setThemeColor(theme2);
      }
      default: {
        setSelectedValue("default");
        localStorage.setItem("themeColor", JSON.stringify(theme1));
        return setThemeColor(theme1);
      }
    }
  };

  useEffect(() => {
    const storedColor = JSON.parse(localStorage.getItem("themeColor"));
    if (storedColor) {
      setThemeColor(storedColor);
    }
    // const root = document.documentElement;
    // root.style.setProperty("--primary", "#9a28a3");
  }, []);
  return (
    <ThemeContext.Provider value={{ themeColor, toggleThemeColor, selectedValue }}>{children}</ThemeContext.Provider>
  );
};
