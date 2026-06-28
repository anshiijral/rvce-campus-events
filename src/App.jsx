import { BrowserRouter, Route, Routes } from "react-router-dom";
import EventFeed from "./pages/EventFeed";
import EventDetail from "./pages/EventDetail";
import Bookmarks from "./pages/Bookmarks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventFeed />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;