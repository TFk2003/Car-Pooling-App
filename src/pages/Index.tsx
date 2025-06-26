import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-center pt-16 pb-8">
        <h1 className="text-2xl font-bold text-gray-900">Carpool</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-20">
        <div className="max-w-sm mx-auto w-full space-y-8">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Get started
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={() => navigate("/email-entry")}
              className="w-full h-14 text-lg font-medium bg-primary hover:bg-primary/90 text-white rounded-full"
            >
              Continue with email
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/phone-entry")}
              className="w-full h-14 text-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full"
            >
              Continue with phone
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
