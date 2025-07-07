import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/layouts/MainLayout";
import Login from "./components/pages/Login";
import Feed from "./components/pages/Feed";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
