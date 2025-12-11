import React from 'react';
import './Marquee.css';

const Marquee = () => {
  const announcements = [
    "🎉 Free Shipping on Orders Above ₹999!",
    "⚡ Flash Sale: Up to 50% Off on Electronics!",
    "🚚 Same Day Delivery Available in Major Cities",
    "💳 Easy EMI Options Available",
    "🔒 100% Secure Payment Gateway",
    "📱 Download Our App for Exclusive Deals"
  ];

  return (
    <div className="marquee-container bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-700 dark:to-purple-700 text-white py-3 overflow-hidden relative transition-colors duration-300">
      <div className="marquee-content flex whitespace-nowrap">
        {announcements.concat(announcements).map((announcement, index) => (
          <span key={index} className="mx-8 text-sm font-medium flex-shrink-0">
            {announcement}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
