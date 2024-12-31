import { useEffect, useState } from 'react';

const socialMediaIcons = [
   // Link1
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGvAxM-ejsN62WBhCNXYMke5rJJRagj0hEtQ&s',
   
   // Link2
   'https://static.vecteezy.com/system/resources/previews/021/495/979/non_2x/whatsapp-social-media-logo-icon-free-png.png',

   // Link3
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoCkY_K9TX2dN21sxK2Np0a2vqnKKHGWP7Ow&s',

   // Link4
   'https://thumbs.dreamstime.com/b/facebook-logo-vector-eps-file-squared-coloured-easily-editable-have-white-background-high-resolution-255557233.jpg',

   // Link5
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdEjIsQcn8NwYWhwISL74xXLGtRHeW1Mn67g&s',

   // Link6
   'https://www.logo.wine/a/logo/Reddit/Reddit-Logomark-White-Dark-Background-Logo.wine.svg',

  // Link7
   'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',

  // Link8
   'https://img.freepik.com/free-vector/instagram-logo_1199-122.jpg?semt=ais_hybrid',

  // Link9
   'https://logos-download.com/wp-content/uploads/2016/07/Telegram_for_Android_3.6_version_2016_Logo.png',
];

const AuthImagePattern = ({ title, subtitle }) => {
  const [iconPositions, setIconPositions] = useState(socialMediaIcons);

  // Function to shuffle icons
  const shuffleIcons = () => {
    const shuffled = [...iconPositions].sort(() => Math.random() - 0.5);
    setIconPositions(shuffled);
  };

  // Shuffle icons every 2 seconds
  useEffect(() => {
    const interval = setInterval(shuffleIcons, 4000);
    return () => clearInterval(interval);
  },); // Removed iconPositions from the dependency array

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-full ${i % 2 === 0 ? "animate-pulse" : ""}`}
              style={{
                backgroundColor: i % 2 === 0 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 255, 0.1)',
                position: 'relative',
              }}
            >
              <img
                src={iconPositions[i]}
                alt={`Social Media Icon ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover rounded-full"
                style={{ borderRadius: '50%' }} // Ensure the image follows the circular shape
              />
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;