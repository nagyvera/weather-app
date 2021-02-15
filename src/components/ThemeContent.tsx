import React from "react";

const themeColours = {
  light: {
    color: "#000000",
    backgroundColor: "#f2fff7"
  },
  dark: {
    color: "#fff",
    backgroundColor: "#3f3f3f"
  }
};

type ThemeName = "light" | "dark";
type ThemeContextType = {
  theme: ThemeName;
  setTheme: (name: ThemeName) => void;
};
const ThemeContext = React.createContext<ThemeContextType>(undefined!);

type Props = {
  children: React.ReactNode;
  themeCode: string;
};

export const ThemeProvider = ({ children, themeCode }: Props) => {
  const [themeName, setThemeName] = React.useState<ThemeName>("light");

  React.useEffect(() => {
    const darkOS = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(darkOS ? "dark" : "light");
  }, []);

  const setTheme = (name: ThemeName) => {
    document.body.style.setProperty("--color", themeColours[name].color);
    document.body.style.setProperty(
      "--background-color",
      themeColours[name].backgroundColor
    );
    setThemeName(name);
  };
  return (
    <ThemeContext.Provider value={{ theme: themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
