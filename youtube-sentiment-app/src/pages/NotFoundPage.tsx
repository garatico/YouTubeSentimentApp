import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = '404';
  }, []);
  return (
    <div>
      <Navbar />
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;
