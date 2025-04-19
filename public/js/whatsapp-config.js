// public/js/whatsapp-config.js

// This script configures the WhatsApp button based on the current page
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  let config = {
    phoneNumber: "+255753187700", // Default phone number
    defaultMessage: "Hello, I'd like to inquire about your logistics services.",
    chatTitle: "Quickship PVT Limited",
    chatSubtitle: "Customs Clearing & Forwarding",
    autoOpenTimeout: 8000 // Auto open after 8 seconds
  };
  
  // Configure based on current page
  if (path.includes("/our-services")) {
    config = {
      ...config,
      defaultMessage: "Hello, I'd like to know more about your services.",
      chatTitle: "Quickship Services",
      chatSubtitle: "Expert Logistics Solutions"
    };
  } 
  else if (path.includes("/about-us")) {
    config = {
      ...config,
      defaultMessage: "Hello, I'd like to know more about Quickship.",
      chatTitle: "About Quickship",
      chatSubtitle: "25+ Years of Experience"
    };
  }
  else if (path.includes("/contact-us")) {
    config = {
      ...config,
      defaultMessage: "Hello, I'd like to get in touch with your team.",
      chatTitle: "Contact Quickship",
      chatSubtitle: "We're Here to Help"
    };
  }
  
  // Initialize WhatsApp button with the configuration
  window.whatsappButton = new WhatsAppButton({
    ...config,
    headerColor: "#FF4800",
    buttonColor: "#25D366", // WhatsApp green
    autoOpenTimeout: 8000 // Auto open after 8 seconds
  });
});