import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "lucas.carter@email.com";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      navigate("/profile-setup");
    }
  };

  const handleResendCode = () => {
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleEditEmail = () => {
    navigate("/email-entry");
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900 flex-1 text-center mr-12">
            Verification
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-sm mx-auto space-y-8">
          {/* Title and Description */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Enter the code</h2>
            <p className="text-gray-600 text-lg">
              We sent a verification code to
            </p>
            <p className="text-gray-900 text-lg font-medium">{email}</p>
          </div>

          {/* Code Input */}
          <div className="space-y-6">
            <div className="flex gap-3 justify-center">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-medium border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                />
              ))}
            </div>

            <div className="text-center space-y-3">
              <button
                onClick={handleResendCode}
                className="block text-gray-500 text-lg underline mx-auto"
              >
                Resend code
              </button>

              <button
                onClick={handleEditEmail}
                className="block text-gray-500 text-lg underline mx-auto"
              >
                Edit email
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Verify Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white">
        <Button
          onClick={handleVerify}
          disabled={code.join("").length !== 6}
          className="w-full h-14 text-lg font-medium bg-primary hover:bg-primary/90 text-white rounded-full disabled:opacity-50"
        >
          Verify
        </Button>
      </div>
    </div>
  );
};

export default EmailVerification;
