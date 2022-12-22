import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Protected({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (!user || !token) {
      return navigate("/");
    }
  });

  return children;
}

export default Protected;
