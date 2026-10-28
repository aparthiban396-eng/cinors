import React from "react";
import { siteConfig } from "@/data/siteData";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30">
      <a
        href={siteConfig.getWhatsAppUrl("Hi CINORS, I have a plot and would like to get a free consultation.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with an Engineer on WhatsApp"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group relative animate-bounce"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 2.028 14.108.977 11.983.977c-5.437 0-9.863 4.37-9.867 9.8a9.74 9.74 0 0 0 1.502 5.093l-1.015 3.7.83-.217 2.083-1.636z" />
          <path d="M16.924 13.917c-.27-.135-1.597-.788-1.846-.878-.247-.09-.427-.135-.607.135-.18.27-.697.878-.854 1.058-.158.18-.315.202-.585.067-.27-.135-1.138-.419-2.167-1.338-.802-.715-1.343-1.6-1.5-1.871-.158-.27-.017-.417.118-.552.122-.122.27-.315.405-.472.135-.158.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.608-1.464-.833-2.005-.22-.527-.44-.457-.607-.465-.158-.007-.338-.007-.518-.007-.18 0-.472.067-.72.337-.247.27-.945.923-.945 2.25s.967 2.61 1.102 2.79c.135.18 1.902 2.904 4.609 4.073.644.278 1.147.444 1.539.569.648.206 1.238.177 1.704.107.52-.078 1.597-.652 1.821-1.282.225-.63.225-1.17.158-1.282-.068-.113-.248-.18-.518-.315z" />
        </svg>
        <span className="absolute right-14 sm:right-16 scale-0 group-hover:scale-100 transition-all origin-right bg-navy-950 text-white font-bold text-xs py-2 px-3 rounded shadow-xl whitespace-nowrap border border-white/10 hidden sm:flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" /> Chat With An Engineer
        </span>
      </a>
    </div>
  );
}
