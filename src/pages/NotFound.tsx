import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            Page Not Found
          </h2>
          <p className="text-gray-500">
            The page you're looking for doesn't exist.
          </p>
        </div>

        <Button
          onClick={() => navigate("/")}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-2"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
