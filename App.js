import Index from "./src/index.js";
export var serverURL = "localhost"; // URL must NOT have a slash at the end
export default Index;

/* APP PROPERTIES */
import { TextInput } from "react-native";
TextInput.defaultProps.selectionColor = "#568BB1"; // all TextInputs will have a blue cursor
TextInput.defaultProps.underlineColorAndroid = "#EFF3F5"; // all TextInputs will have a white underline
console.disableYellowBox = true; // disable yellow Expo warning boxes
