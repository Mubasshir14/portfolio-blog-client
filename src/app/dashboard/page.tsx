import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className=" dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-primary to-secondary" />

          {/* Profile Section */}
          <div className="relative px-4 sm:px-6 lg:px-8 pb-8">
            {/* Profile Image */}
            <div className="relative -mt-16 flex justify-center">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt="User Profile"
                  width={128}
                  height={128}
                  className="ring-4 ring-white dark:ring-gray-800 rounded-full shadow-lg"
                />
              )}
            </div>

            {/* User Info */}
            <div className="mt-6 text-center">
              <h1 className="text-3xl font-bold text-secondary dark:text-white">
                {session.user?.name}
              </h1>
              <p className="mt-2 text-lg text-secondary dark:text-gray-400">
                {session.user?.email}
              </p>
            </div>

            {/* Stats Section */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className=" dark:bg-gray-700 rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-secondary dark:text-gray-300">
                  Projects
                </h3>
                <p className="mt-2 text-3xl font-bold text-primary">12</p>
              </div>
              <div className=" dark:bg-gray-700 rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-secondary dark:text-gray-300">
                  Blog Posts
                </h3>
                <p className="mt-2 text-3xl font-bold text-primary">24</p>
              </div>
              <div className=" dark:bg-gray-700 rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-secondary dark:text-gray-300">
                  Views
                </h3>
                <p className="mt-2 text-3xl font-bold text-primary">2.4k</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
