import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Twin } from "./pages/Twin";
import { AdminLayoutV2 } from "./layoutV2";
import { Photosynthesis } from "./pages/strains";
import Dashboard from "./pages/dashboard";
import { NewHarvest } from "./pages/NewHarvest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayoutV2 />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rooms" element={<Twin />} />
          <Route path="/harvest" element={<NewHarvest />} />
          <Route path="/strains" element={<Photosynthesis />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
