import React, { useState, useEffect, useRef } from 'react';

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [shouldRender, setShouldRender] = useState(true); // Set to true by default to debug visibility
  const [debugInfo, setDebugInfo] = useState(""); // For debugging
  const chatRef = useRef(null);
  const buttonRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pageContent, setPageContent] = useState({
    phoneNumber: "+254758464586", // Default for debugging
    defaultMessage: "Hello, I'd like to know more about Shukran's services.",
    chatTitle: "Shukran",
    chatSubtitle: "Digital Tipping & Finance",
    chatContent: (
      <>
        <p className="text-sm">Hello! Thanks for connecting with <strong>Shukran</strong>.</p>
        <p className="text-sm mt-2">We're here to help you learn more about our services.</p>
        <p className="text-sm mt-2">Click below to chat with our team.</p>
      </>
    )
  });

  useEffect(() => {
    // Determine current page
    const currentPath = window.location.pathname;
    console.log("Current path:", currentPath); // Debug log

    // Always render for debugging
    setShouldRender(true);

    // Set debug info
    setDebugInfo(`Path: ${currentPath}`);

    // Still attempt to set correct content
    if (currentPath === "/" || currentPath === "/index.html" || currentPath === "") {
      // Home page settings
      setPageContent({
        phoneNumber: "+254758464586",
        defaultMessage: "Hello, I'd like to know more about Digital Tipping.",
        chatTitle: "Shukran",
        chatSubtitle: "Digital Tipping & Finance",
        chatContent: (
          <>
            <p className="text-sm">👋Hello! Thanks for connecting with <strong>Shukran</strong>.</p>
            <p className="text-sm mt-2">We're here to help you tip a service worker with ease. <br /><br /> Here's what we can assist you with:</p>
            <ul className="sm:ml-5 mt-2 text-sm">
              <li><strong>✅How Shukran Tip works </strong> – Seamless digital tipping to service workers.</li>
              <li><strong>✅Registering into Shukran Tip </strong> – Setting yourself up for a smooth tipping experience</li>
              <li><strong>✅Benefits of digital tipping</strong> </li>
              <li><strong>✅How your information is kept secure with Shukran Tip</strong> </li>
            </ul>
            <p className="text-sm mt-2">Have any questions? Let us know how we can support you! Just type below, and we'll get back to you shortly.</p>
          </>
        )
      });
    }
    else if (currentPath === "/hotels" || currentPath.startsWith("/hotels/")) {
      // Hotels page settings
      setPageContent({
        phoneNumber: "+254701711737",
        defaultMessage: "Hello, I'd like to know more about Shukran's tipping solution for my hotel.",
        chatTitle: "Shukran",
        chatSubtitle: "Hotel Tipping Solution",
        chatContent: (
          <>
            <p className="text-sm">👋Hi there! Thanks for connecting with <strong>Shukran</strong>.</p>
            <p className="text-sm mt-2">We're here to help you create an exceptional tipping experience for your guests and team. Here's what we can assist you with:</p>
            <ul className="list-disc ml-4 sm:ml-5 mt-2 text-sm">
              <li><strong>How Shukran works for hotels</strong> – Get seamless digital tipping solutions for your guests.</li>
              <li><strong>Onboarding your team</strong> – Setup for service workers and managers.</li>
              <li><strong>Benefits for your hotel</strong> – Improve guest experience and employee satisfaction.</li>
              <li><strong>Learn about Shukran Finance</strong> – Maximize savings, credit, and other financial services for your staff.</li>
            </ul>
            <p className="text-sm mt-2">Have any questions? Let us know how we can support you! Just type below, and we'll get back to you shortly.</p>
          </>
        )
      });
    }
    else if (currentPath === "/community" || currentPath.startsWith("/community/")) {
      // Community page settings
      setPageContent({
        phoneNumber: "+254795227851", // Community contact number
        defaultMessage: "Hello, I'd like to know more about joining the Shukran community.",
        chatTitle: "Shukran Community",
        chatSubtitle: "Join Our Service Worker Network",
        chatContent: (
          <>
            <p className="text-sm">👋 Hello! Thanks for connecting with the <strong>Shukran Community</strong>.</p>
            <p className="text-sm mt-2">We're here to help you connect with fellow service workers and make the most of your Shukran membership. Here's how we can assist you:</p>
            <ul className="sm:ml-5 mt-2 text-sm">
              <li><strong>✅ Join the Shukran community </strong> – Connect with other service professionals.</li>
              <li><strong>✅ Community events & meetups </strong> – Learn about upcoming gatherings and networking opportunities.</li>
              <li><strong>✅ Skill development resources </strong> – Access training and growth opportunities.</li>
              <li><strong>✅ Member benefits & support </strong> – Learn how to maximize your Shukran membership.</li>
            </ul>
            <p className="text-sm mt-2">Have questions about the community? Let us know how we can help! Our community team is ready to assist you.</p>
          </>
        )
      });
    }

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsLoading(true);

      // Simulate loading with dots animation
      setTimeout(() => {
        setIsLoading(false);
        setShowContent(true);
      }, 1500);
    } else {
      setIsOpen(false);
      setShowContent(false);
    }
  };

  const handleStartChat = () => {
    try {
      // Format phone number (remove non-digits)
      const formattedPhone = pageContent.phoneNumber.replace(/[^\d]/g, '');

      // Encode the message ONCE with encodeURIComponent
      const message = encodeURIComponent(pageContent.defaultMessage);

      // Use wa.me URL (or api.whatsapp.com if preferred)
      const whatsappUrl = `https://wa.me/${formattedPhone}?text=${message}`;
      console.log("WhatsApp URL:", whatsappUrl);

      // Open the URL (use window.open for consistency across platforms)
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      const phone = pageContent.phoneNumber.replace(/[^\d]/g, '');
      window.open(`https://wa.me/${phone}`, "_blank");
      alert("Please copy this message to send:\n\n" + pageContent.defaultMessage);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        chatRef.current &&
        buttonRef.current &&
        !chatRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setShowContent(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed z-50 bottom-4 right-4 md:bottom-8 md:right-8">
      {/* Small debug indicator - remove in production */}
      <div className="hidden bg-white text-xs p-1 mb-1 rounded opacity-50">
        Debug: {debugInfo}
      </div>

      {isOpen && (
        <div
          ref={chatRef}
          className="bg-white rounded-xl shadow-xl mb-4 w-[calc(100vw-32px)] sm:w-[360px] h-[70vh] sm:h-[590px] overflow-hidden border border-none flex flex-col"
          style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 100px)' }}
        >
          <div className="bg-[#006e63] text-white p-4 relative flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex-shrink-0 mr-3 overflow-hidden flex items-center justify-center">
              <img
                src="/favicon.png"
                alt="Shukran Logo"
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23006e63' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v6h-2zm0 8h2v2h-2z'/%3E%3C/svg%3E";
                }}
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">{pageContent.chatTitle}</h3>
              <p className="text-sm opacity-90">{pageContent.chatSubtitle}</p>
            </div>
            <button
              onClick={toggleChat}
              className="absolute top-3 right-3 text-white"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-4 flex-1 overflow-y-auto bg-[#e5ddd5] bg-opacity-90 bg-cover bg-[url('/homepage/whtbg.jpg')]">
            {isLoading ? (
              <div className="flex items-center space-x-1 justify-center py-8">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            ) : showContent ? (
              <div>
                <div className="text-gray-500 text-xs mb-1 text-center">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="relative">
                  <div className="bg-white relative rounded-lg p-3 shadow-sm max-w-[95%] sm:max-w-[90%]" style={{ borderRadius: '7.5px 7.5px 7.5px 0' }}>
                    <div
                      className="absolute w-4 h-4 bg-white"
                      style={{
                        top: 0,
                        left: '-8px',
                        clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)'
                      }}
                    ></div>

                    {pageContent.chatContent}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {showContent && (
            <div className="flex justify-center border-t py-3">
              <button
                onClick={handleStartChat}
                className="flex items-center justify-center bg-[#25D366] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full w-full max-w-[180px] sm:max-w-[200px] text-sm sm:text-base font-medium transition-all hover:bg-[#1da851]"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Talk to us
              </button>
            </div>
          )}
        </div>
      )}

      <button
        ref={buttonRef}
        onClick={toggleChat}
        className="bg-[#25D366] hover:bg-[#1da851] w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg relative transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full"></div>
        )}
        <svg
          className="w-6 h-6 md:w-8 md:h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppButton;