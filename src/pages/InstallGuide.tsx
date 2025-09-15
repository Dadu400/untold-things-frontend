import React from 'react';
import shareIcon from '../assets/icons/share.jpg';
import homeScreenIcon from '../assets/icons/homescreen.jpg';
import addToHomeScreenIcon from '../assets/icons/addtohomescreen.jpg';
import { usePWAInstallContext } from '../hooks/PWAInstallContext';

const InstallGuide: React.FC = () => {
  const { isIOS, triggerInstall } = usePWAInstallContext();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">

      {isIOS ? (
        <div className="space-y-8">
             <h1 className="text-3xl font-bold tracking-wider text-gray-900 dark:text-white mb-6 font-firago">გადმოწერე</h1>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-bold">1</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-dejavu text-xl">
                დააჭირე <strong>"Share"</strong> აიქონს
              </p>
            </div>
            <div className="ml-11">
              <img src={shareIcon} alt="Share button in Safari" className="rounded-lg shadow-md" />
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-bold">2</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-dejavu text-xl">
                შემდეგ <strong>"Add to Home Screen"</strong>
              </p>
            </div>
            <div className="ml-11">
              <img src={homeScreenIcon} alt="Add to Home Screen option" className="rounded-lg shadow-md" />
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-bold">3</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-dejavu text-xl">
                ბოლოს <strong>"Add"</strong>
              </p>
            </div>
            <div className="ml-11">
              <img src={addToHomeScreenIcon} alt="Add to Home Screen option" className="rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 items-center">
          <button 
            onClick={triggerInstall}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-firago"
          >
            გადმოწერე აპლიკაცია
          </button>
        </div>
      )}
    </div>
  );
};

export default InstallGuide;
