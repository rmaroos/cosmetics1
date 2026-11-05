import React from 'react';
import { whatsAppUrl } from '../../config/site';

/** Floating WhatsApp support widget — fixed bottom-right. */
export function WhatsAppWidget() {
  const url = whatsAppUrl();

  /* Don't render if no number is configured. */
  if (!url) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5">
      {/* "Need Help?" label – hidden on small screens */}
      <span className="hidden sm:block rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-gray-700 shadow-md">
        Need Help?{' '}
        <span className="font-semibold text-gray-900">Chat with us</span>
      </span>

      {/* Green WhatsApp circle button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl active:scale-95"
      >
        {/* Official WhatsApp logo SVG (white) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-8 w-8"
          aria-hidden="true"
        >
          <path
            fill="#fff"
            d="M16.004 2.667C8.638 2.667 2.667 8.637 2.667 16c0 2.344.635 4.636 1.839 6.646L2.667 29.333l6.861-1.796A13.27 13.27 0 0 0 16.004 29.333C23.37 29.333 29.333 23.363 29.333 16S23.37 2.667 16.004 2.667zm0 2.4c5.983 0 10.93 4.947 10.93 10.933s-4.947 10.933-10.93 10.933a10.89 10.89 0 0 1-5.567-1.527l-.399-.24-4.072 1.066 1.088-3.964-.264-.415A10.89 10.89 0 0 1 5.07 16c0-5.986 4.948-10.933 10.933-10.933zm-3.097 5.733c-.19-.003-.395.003-.589.003-.64 0-1.63.24-2.483 1.173-.853.933-3.254 3.18-3.254 7.754s3.333 8.987 3.773 9.587c.44.6 6.44 10.253 15.826 13.973 2.333.934 4.147 1.494 5.56 1.907 2.337.653 4.467.56 6.147.34 1.88-.253 5.76-2.36 6.573-4.627.813-2.267.813-4.207.56-4.613-.253-.407-6.573-.413-7.413-.827-.853-.413-1.253.213-1.76.627s-2.027 1.627-2.48 1.973-.893.52-1.613.173c-.72-.347-3.04-1.12-5.787-3.573-2.14-1.907-3.573-4.253-3.987-4.973-.413-.72-.04-1.107.307-1.467.333-.333.747-.867 1.12-1.3.373-.433.5-.747.747-1.247.247-.5.12-.933-.067-1.307-.187-.373-1.68-4.053-2.307-5.546-.6-1.44-1.213-1.254-1.667-1.267-.427-.013-.88-.013-1.333-.013z"
          />
        </svg>
      </a>
    </div>
  );
}

