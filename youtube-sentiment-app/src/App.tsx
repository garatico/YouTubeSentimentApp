import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"; // Import your home page component
import ChannelGetPage from "./pages/ChannelGetPage/ChannelGetPage";
import VideoGetPage from "./pages/VideoGetPage/VideoGetPage";
import VideoDataPage from "./pages/VideoDataPage/VideoDataPage";
import DocumentationPage from "./pages/DocumentationPage/DocumentationPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ChannelSearch" element={<ChannelGetPage />} />
            <Route path="/VideoSearch" element={<VideoGetPage />} />
            <Route path="/VideoDataPage" element={<VideoDataPage />} />
            <Route path="/DocumentationPage" element={<DocumentationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
