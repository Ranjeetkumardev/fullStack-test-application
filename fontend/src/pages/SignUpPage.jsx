import { useState } from "react";
import { toast } from 'sonner';
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link ,Navigate} from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
 

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return "Full name is required";
    }
    if (!formData.email.trim()) {
      toast.error("Email is require");
      return "Email is required";}
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return "Invalid email format"
    };
    if (!formData.password) {
      return toast.error("Password is required");
    }
    if (formData.password.length < 6)
      return "Password must be at least 6 characters";
    toast.error('Password must be at least 6 characters');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    try {
      if (success === true && formData) {
        const response = await signup(formData);
        if (response) {
          toast.success("Signed up successfully");
          <Navigate to="/home" />;
        } else {
          toast.error("Something went wrong. Please try again");
        }
      }
    } catch (err) {
      console.log("err", err);
    }
    setFormData({
      fullName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-500">
      {/* Navbar Section */}
      <div className="absolute top-4 left-10   z-20">
        <Link to={"/"}>
          <img
            src="/social-network-logo.svg"
            alt="logo"
            className="w-[70px] h-12 object-cover cursor-pointer brightness-125"
          />
        </Link>
      </div>
      {/* left side */}
      <div className="flex flex-col justify-center items-center ">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl  flex items-center justify-center">
                <MessageSquare className="size-6  " />
              </div>
              <h1 className="text-2xl font-bold">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          {/* SignupForm */}
          <div className="space-y-4 px-4 md:px-2">
            <div>
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10 py-1`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10 py-1`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 py-1`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="bg-blue-600 p-1.5 w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin text-center" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          {/* bottom Message */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="hidden lg:flex flex-col items-center justify-center  p-12 bg-gray-600 ">
        <p className="text-2xl font-bold mb-4 text-center">
          Join our community
        </p>
        <p>
          Connect with friends, share moments, and stay in touch with your loved
          ones.
        </p>
      </div>
    </div>
  );
};
export default SignUpPage;
