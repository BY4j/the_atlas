import { Routes, Route } from "react-router-dom";
import Public from "./components/Public";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Public />} />
    </Routes>
  );
}

export default App;
