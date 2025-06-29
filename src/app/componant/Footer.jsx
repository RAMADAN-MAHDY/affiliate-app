import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#232526] to-[#414345] text-white py-6 mt-12 shadow-inner">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star animate-pulse">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <a
            href="https://ramadan-three.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-bold tracking-wide hover:text-yellow-400 transition-colors duration-200 underline underline-offset-4 decoration-yellow-400"
          >
            تم التطوير بواسطة رمضان
          </a>
        </div>
        <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
};

export default Footer;
