import React from 'react';
import shareIcon from '../../assets/icons/share.jpg';
import homeScreenIcon from '../../assets/icons/homescreen.jpg';
import addToHomeScreenIcon from '../../assets/icons/addtohomescreen.jpg';


interface IOSInstallGuideProps {
  onClose: () => void;
}

const IOSInstallGuide: React.FC<IOSInstallGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">ინსტრუქცია</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4 overflow-y-auto flex-1 -mr-2 pr-2">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-300 font-bold">1</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
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
              <p className="text-gray-700 dark:text-gray-300">
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
              <p className="text-gray-700 dark:text-gray-300">
                ბოლოს <strong>"Add"</strong>
              </p>
            </div>
          </div>
          <div className="ml-11">
              <img src={addToHomeScreenIcon} alt="Add to Home Screen option" className="rounded-lg shadow-md" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default IOSInstallGuide;