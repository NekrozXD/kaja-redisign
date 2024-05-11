// import React, { useContext } from "react";
// import { ThemeContext } from "../../context/ThemeContext";
// import { DARK_THEME, LIGHT_THEME } from "../../constants/themeConstants";

// const SettingsPage = () => {
//   const { theme, toggleTheme } = useContext(ThemeContext);

//   const handleThemeChange = (theme) => {
//     toggleTheme(theme === DARK_THEME ? LIGHT_THEME : DARK_THEME);
// };


//   return (
//     <div className="settings-page">
//       <h2>Settings</h2>
//       <div className="theme-toggle">
//         <label>
//           <input
//             type="checkbox"
//             checked={theme === DARK_THEME}
//             onChange={() => handleThemeChange(DARK_THEME)}
//           />
//           Dark Mode
//         </label>
//       </div>
//       <div className="theme-toggle">
//         <label>
//           <input
//             type="checkbox"
//             checked={theme === LIGHT_THEME}
//             onChange={() => handleThemeChange(LIGHT_THEME)}
//           />
//           Light Mode
//         </label>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "../../constants/themeConstants";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import './Settings.scss'

const CustomRadioButton = ({ value, children, checked, onChange }) => (
    <label style={{display:'flex', alignItems:'center', flexDirection:'row'}}>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {children}
    </label>
  );
  

const SettingsPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleThemeChange = (theme) => {
    toggleTheme(theme === DARK_THEME ? LIGHT_THEME : DARK_THEME);
};

return (
    <div className="settings-page">
      <h2>Settings</h2>
      <br/>

      <form style={{display:'flex', flexDirection:'row', gap:'25px'}}>
        <p>theme: </p>
      <RadioGroup onChange={handleThemeChange} value={theme}>
        <CustomRadioButton value={DARK_THEME} className="custom-radio-button">
          Dark Mode
        </CustomRadioButton>
        <CustomRadioButton value={LIGHT_THEME} className="custom-radio-button">
          Light Mode
        </CustomRadioButton>
      </RadioGroup>
      </form>
    </div>
    
  );
};

export default SettingsPage;

