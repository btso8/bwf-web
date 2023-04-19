import { createTheme } from "@mui/material/styles";
import amber from "@mui/material/colors/amber";
import lightBlue from "@mui/material/colors/lightBlue";

const theme = createTheme({
  palette: {
    primary: amber,
    secondary: lightBlue,
  },
  colors: {
    bgColor: "#3e3e3e",
    bgLightColor: "#888",
    bgLighterColor: "#DADADA",
    mainAccentColor: "#fecc01",
  },
});

export default theme;
