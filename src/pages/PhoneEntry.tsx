import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PhoneEntry = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleNext = () => {
    if (phoneNumber.trim()) {
      navigate("/phone-verification", { state: { phoneNumber } });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-center pt-16 pb-12">
        <h1 className="text-2xl font-bold text-gray-900">Carpool</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-20">
        <div className="max-w-sm mx-auto w-full space-y-8">
          {/* Title */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Enter your phone number
            </h2>
          </div>

          {/* Phone Input */}
          <div className="space-y-6">
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone number"
              className="h-14 text-lg bg-gray-50 border-0 rounded-lg placeholder:text-gray-400"
            />

            <Button
              onClick={handleNext}
              disabled={!phoneNumber.trim()}
              className="w-full h-14 text-lg font-medium bg-primary hover:bg-primary/90 text-white rounded-full disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="px-6 pb-8">
        <div className="text-center text-sm text-gray-500 leading-relaxed">
          By continuing, you agree to our{" "}
          <button className="text-primary underline">Terms of Service</button>{" "}
          and <button className="text-primary underline">Privacy Policy</button>
          .
        </div>
      </div>
    </div>
  );
};

export default PhoneEntry;
