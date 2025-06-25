import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  gender: z.string().min(1, "Please select a gender"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  mode: z.enum(["Rider", "Driver", "Both"]),
  make: z.string().optional(),
  model: z.string().optional(),
  numberPlate: z.string().optional(),
  numberOfSeats: z.string().optional(),
  acAvailable: z.boolean().default(false),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<"Rider" | "Driver" | "Both">(
    "Rider",
  );
  const [acAvailable, setAcAvailable] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "",
      phoneNumber: "",
      mode: "Rider",
      make: "",
      model: "",
      numberPlate: "",
      numberOfSeats: "",
      acAvailable: false,
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log("Profile data:", data);
    // Handle form submission here
    navigate("/dashboard");
  };

  const ModeButton = ({
    mode,
    isSelected,
    onClick,
  }: {
    mode: string;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-6 py-3 rounded-full text-sm font-medium transition-colors",
        isSelected
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200",
      )}
    >
      {mode}
    </button>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Get Started Section */}
      <div className="bg-white px-6 py-8">
        {/* Header */}
        <div className="flex justify-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Carpool</h1>
        </div>

        {/* Get Started */}
        <div className="max-w-sm mx-auto space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center">
            Get started
          </h2>

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

      {/* Profile Setup Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Profile Setup</h1>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-6 py-6 space-y-6"
        >
          {/* Basic Information */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 bg-gray-50 border-0 rounded-lg"
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="h-12 bg-gray-50 border-0 rounded-lg"
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Gender
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 bg-gray-50 border-0 rounded-lg"
                      placeholder="Select gender"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      className="h-12 bg-gray-50 border-0 rounded-lg"
                      placeholder="Enter your phone number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Profile Picture */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Profile Picture
              </Label>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                <span className="text-gray-500">No file selected</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-primary border-primary hover:bg-primary/10"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </div>

          {/* Select Mode */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Select Mode</h3>
            <div className="flex gap-3">
              <ModeButton
                mode="Rider"
                isSelected={selectedMode === "Rider"}
                onClick={() => {
                  setSelectedMode("Rider");
                  form.setValue("mode", "Rider");
                }}
              />
              <ModeButton
                mode="Driver"
                isSelected={selectedMode === "Driver"}
                onClick={() => {
                  setSelectedMode("Driver");
                  form.setValue("mode", "Driver");
                }}
              />
              <ModeButton
                mode="Both"
                isSelected={selectedMode === "Both"}
                onClick={() => {
                  setSelectedMode("Both");
                  form.setValue("mode", "Both");
                }}
              />
            </div>
          </div>

          {/* Vehicle Details - Show only if Driver or Both */}
          {(selectedMode === "Driver" || selectedMode === "Both") && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Vehicle Details
              </h3>

              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Make
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12 bg-gray-50 border-0 rounded-lg"
                        placeholder="Make"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Model
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12 bg-gray-50 border-0 rounded-lg"
                        placeholder="Model"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberPlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Number Plate
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12 bg-gray-50 border-0 rounded-lg"
                        placeholder="Number Plate"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfSeats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Number of Seats
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-12 bg-gray-50 border-0 rounded-lg"
                        placeholder="Number of Seats"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* AC Available Toggle */}
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                <Label className="text-sm font-medium text-gray-700">
                  AC Available
                </Label>
                <Switch
                  checked={acAvailable}
                  onCheckedChange={(checked) => {
                    setAcAvailable(checked);
                    form.setValue("acAvailable", checked);
                  }}
                />
              </div>
            </div>
          )}

          {/* Optional Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Optional</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    Set Daily Schedule
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <span className="text-xl">→</span>
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    Preferred Pickup Locations
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <span className="text-xl">→</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-6">
            <Button
              type="submit"
              className="w-full h-14 text-lg font-medium bg-primary hover:bg-primary/90 text-white rounded-full"
            >
              Save
            </Button>
          </div>

          {/* Terms */}
          <div className="text-center text-sm text-gray-500 leading-relaxed">
            By continuing, you agree to our{" "}
            <button className="text-primary underline">Terms of Service</button>{" "}
            and{" "}
            <button className="text-primary underline">Privacy Policy</button>.
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileSetup;
