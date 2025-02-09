"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b ">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-10" />

          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Image */}
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-2xl opacity-20" />
                  <Image
                    src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
                    width={600}
                    height={500}
                    alt="login illustration"
                    className="relative rounded-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Welcome Back
                  </h1>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Sign in to continue to your account
                  </p>
                </div>

                {/* Social Login Buttons */}
                <div className="flex flex-col gap-4 mb-8">
                  <button
                    onClick={() =>
                      signIn("google", {
                        callbackUrl:
                          "https://personal-portfolio-blog-nu.vercel.app",
                      })
                    }
                    className="flex items-center justify-center gap-3 w-full px-4 py-3 border dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 border-primary"
                  >
                    <Image
                      src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                      width={20}
                      height={20}
                      alt="Google"
                    />
                    <span>Continue with Google</span>
                  </button>

                  <button
                    onClick={() =>
                      signIn("github", {
                        callbackUrl:
                          "https://personal-portfolio-blog-nu.vercel.app",
                      })
                    }
                    className="flex items-center justify-center gap-3 w-full px-4 py-3 border dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 border-primary"
                  >
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                      width={20}
                      height={20}
                      alt="GitHub"
                    />
                    <span>Continue with GitHub</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
