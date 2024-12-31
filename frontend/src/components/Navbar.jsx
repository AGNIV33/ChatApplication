import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Home } from "lucide-react"; // Import Home icon

const Navbar = () => {
  const { logout, authUser  } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 duration-300 transition-all glass-effect">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left Section: Logo and App Name */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold text-black">TalkNest</h1>
            </Link>
          </div>

          {/* Right Section: Navigation Buttons */}
          <div className="flex items-center gap-2">
            {/* Settings Button */}
            <Link to={"/settings"} className={`btn btn-sm gap-2 transition-colors glass-effect`}>
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {/* Home Button */}
            <Link to={"/"} className={`btn btn-sm gap-2 glass-effect`}>
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            {/* Conditional Buttons for Authenticated Users */}
            {authUser  && (
              <>
                {/* Profile Button */}
                <Link to={"/profile"} className={`btn btn-sm gap-2 glass-effect`}>
                  <User  className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                {/* Logout Button */}
                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;