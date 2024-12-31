import { useState } from "react"; // Import useState
import { X, Video, Phone, Palette } from "lucide-react"; // Import Palette icon
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser} = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [isProfilePicPopupOpen, setIsProfilePicPopupOpen] = useState(false); // State for popup visibility
  const [wallpaper, setWallpaper] = useState(localStorage.getItem("chatWallpaper") || ""); // State for wallpaper

  // Function to handle wallpaper upload
  const handleWallpaperChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const wallpaperUrl = e.target.result;
        setWallpaper(wallpaperUrl); // Set wallpaper URL in state
        localStorage.setItem("chatWallpaper", wallpaperUrl); // Save wallpaper URL in localStorage
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="relative">
      {/* Chat Header */}
      <div className={`p-2.5 border-b border-base-300 ${isProfilePicPopupOpen ? "backdrop-blur-sm" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="avatar">
              <div
                className="size-10 rounded-full relative cursor-pointer"
                onClick={() => setIsProfilePicPopupOpen(true)} // Open popup on click
              >
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt={selectedUser.fullName}
                  className="w-full h-full rounded-full"
                />
              </div>
            </div>

            {/* User info */}
            <div>
              <h3 className="font-medium">{selectedUser.fullName}</h3>
              <p
                className={`text-sm ${
                  onlineUsers.includes(selectedUser._id) ? "text-green-500" : "text-red-500"
                }`}
              >
                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          {/* Theme, Caller, Video call, and close buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Icon Button */}
            <label htmlFor="wallpaper-upload" className="p-2 rounded-full bg-base-200 hover:bg-base-300 transition-colors cursor-pointer">
              <Palette className="size-5" /> {/* Theme icon */}
              <input
                id="wallpaper-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleWallpaperChange}
              />
            </label>

            {/* Caller Icon Button */}
            <button
              onClick={() => console.log("Call clicked")}
              className="p-2 rounded-full bg-base-200 hover:bg-base-300 transition-colors"
            >
              <Phone className="size-5" /> {/* Caller icon */}
            </button>

            {/* Video Call Icon Button */}
            <button
              onClick={() => console.log("Video call clicked")}
              className="p-2 rounded-full bg-base-200 hover:bg-base-300 transition-colors"
            >
              <Video className="size-5" /> {/* Video call icon */}
            </button>

            {/* Close Button */}
            <button
              onClick={() => setSelectedUser       (null)}
              className="p-2 rounded-full bg-base-200 hover:bg-base-300 transition-colors"
            >
              <X className="size-5" /> {/* Close button */}
            </button>
          </div>
        </div>
      </div>


          {/* Profile Picture Popup */}
      {isProfilePicPopupOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          {/* Blurred Background */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsProfilePicPopupOpen(false)} // Close popup on background click
          ></div>

          {/* Popup Content */}
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm glass-effect transform translate-y-40">
            {/* Profile Picture */}
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-48 h-48 rounded-full mx-auto"
            />
            {/* User's Name */}
            <h3 className="text-center font-medium mt-4">{selectedUser.fullName}</h3>
            {/* Close Button */}
            <button
              onClick={() => setIsProfilePicPopupOpen(false)}
              className="absolute top-2 right-2 p-2 rounded-full bg-base-200 hover:bg-base-300 transition-colors"
            >
              <X className="size-5" /> {/* Close button */}
            </button>
          </div>
        </div>
      )}

      {/* Apply Wallpaper to Chatting Section */}
      {wallpaper && (
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${wallpaper})` }}
        ></div>
      )}
    </div>
  );
};

export default ChatHeader;