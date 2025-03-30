// public/js/WhatsAppButton.js
class WhatsAppButton {
  constructor(options = {}) {
    this.options = Object.assign({
      phoneNumber: "+254700000000", // Default phone number
      defaultMessage: "Hello, I'd like to inquire about your logistics services.",
      chatTitle: "Quickship PVT Limited",
      chatSubtitle: "Customs Clearing & Forwarding",
      position: "right", // 'right' or 'left'
      showOnMobile: true,
      showOnDesktop: true,
      autoOpenTimeout: 0, // Set to 0 to disable auto open
      headerColor: "#FF4800", // Primary color from your Bootstrap theme
      buttonColor: "#FF4800"
    }, options);

    this.isOpen = false;
    this.isLoading = false;
    this.showContent = false;
    this.currentTime = new Date();

    this.init();
  }

  init() {
    this.createElements();
    this.setupEventListeners();
    this.updateTime();

    // Auto open chat after timeout if set
    if (this.options.autoOpenTimeout > 0) {
      setTimeout(() => {
        this.toggleChat();
      }, this.options.autoOpenTimeout);
    }
  }

  createElements() {
    // Create main container
    this.container = document.createElement('div');
    this.container.className = 'whatsapp-button-container';
    this.container.style.position = 'fixed';
    this.container.style.bottom = '30px';
    this.container.style.zIndex = '9999';
    this.container.style[this.options.position] = '30px';

    // Create chat button
    this.button = document.createElement('button');
    this.button.className = 'btn btn-lg rounded-circle shadow-lg whatsapp-button';
    this.button.style.backgroundColor = this.options.buttonColor;
    this.button.style.color = 'white';
    this.button.style.width = '60px';
    this.button.style.height = '60px';
    this.button.style.display = 'flex';
    this.button.style.alignItems = 'center';
    this.button.style.justifyContent = 'center';
    this.button.innerHTML = '<i class="fab fa-whatsapp fa-2x"></i>';
    this.button.setAttribute('aria-label', 'Chat on WhatsApp');

    // Add notification dot
    this.notificationDot = document.createElement('div');
    this.notificationDot.className = 'notification-dot';
    this.notificationDot.style.position = 'absolute';
    this.notificationDot.style.top = '-5px';
    this.notificationDot.style.right = '-5px';
    this.notificationDot.style.width = '15px';
    this.notificationDot.style.height = '15px';
    this.notificationDot.style.backgroundColor = '#dc3545';
    this.notificationDot.style.borderRadius = '50%';
    this.button.appendChild(this.notificationDot);

    // Create chat panel (hidden by default)
    this.chatPanel = document.createElement('div');
    this.chatPanel.className = 'whatsapp-chat-panel card shadow';
    this.chatPanel.style.display = 'none';
    this.chatPanel.style.position = 'absolute';
    this.chatPanel.style.bottom = '70px';
    this.chatPanel.style[this.options.position] = '0';
    this.chatPanel.style.width = '350px';
    this.chatPanel.style.maxWidth = 'calc(100vw - 60px)';
    this.chatPanel.style.height = '450px';
    this.chatPanel.style.maxHeight = 'calc(100vh - 120px)';
    this.chatPanel.style.borderRadius = '10px';
    this.chatPanel.style.overflow = 'hidden';
    this.chatPanel.style.display = 'flex';
    this.chatPanel.style.flexDirection = 'column';

    // Create header
    this.chatHeader = document.createElement('div');
    this.chatHeader.className = 'card-header p-3';
    this.chatHeader.style.backgroundColor = this.options.headerColor;
    this.chatHeader.style.color = 'white';
    this.chatHeader.style.display = 'flex';
    this.chatHeader.style.alignItems = 'center';

    // Company logo/avatar
    this.avatar = document.createElement('div');
    this.avatar.className = 'rounded-circle bg-white mr-3';
    this.avatar.style.width = '40px';
    this.avatar.style.height = '40px';
    this.avatar.style.display = 'flex';
    this.avatar.style.alignItems = 'center';
    this.avatar.style.justifyContent = 'center';
    this.avatar.innerHTML = '<img src="/img/logo.webp" alt="Logo" style="width: 30px; height: 30px; object-fit: contain;">';

    // Header text
    this.headerText = document.createElement('div');
    this.headerTitle = document.createElement('h5');
    this.headerTitle.className = 'mb-0 font-weight-bold';
    this.headerTitle.textContent = this.options.chatTitle;
    this.headerSubtitle = document.createElement('small');
    this.headerSubtitle.textContent = this.options.chatSubtitle;
    this.headerText.appendChild(this.headerTitle);
    this.headerText.appendChild(this.headerSubtitle);

    // Close button
    this.closeButton = document.createElement('button');
    this.closeButton.className = 'close text-white ml-auto';
    this.closeButton.innerHTML = '&times;';
    this.closeButton.setAttribute('aria-label', 'Close');

    // Assemble header
    this.chatHeader.appendChild(this.avatar);
    this.chatHeader.appendChild(this.headerText);
    this.chatHeader.appendChild(this.closeButton);

    // Create chat body
    this.chatBody = document.createElement('div');
    this.chatBody.className = 'card-body';
    this.chatBody.style.backgroundColor = '#e5ddd5';
    this.chatBody.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg width=\'64\' height=\'64\' viewBox=\'0 0 64 64\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z\' fill=\'%23ffffff\' fill-opacity=\'0.15\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")';
    this.chatBody.style.flex = '1';
    this.chatBody.style.overflowY = 'auto';
    this.chatBody.style.display = 'flex';
    this.chatBody.style.flexDirection = 'column';
    this.chatBody.style.padding = '16px';

    // Chat loading indicator (initially hidden)
    this.loadingIndicator = document.createElement('div');
    this.loadingIndicator.className = 'd-flex justify-content-center align-items-center py-4';
    this.loadingIndicator.style.display = 'none';
    this.loadingIndicator.innerHTML = `
      <div class="spinner-grow text-secondary mx-1" role="status" style="width: 8px; height: 8px;"></div>
      <div class="spinner-grow text-secondary mx-1" role="status" style="width: 8px; height: 8px; animation-delay: 0.2s;"></div>
      <div class="spinner-grow text-secondary mx-1" role="status" style="width: 8px; height: 8px; animation-delay: 0.4s;"></div>
    `;
    this.chatBody.appendChild(this.loadingIndicator);

    // Time indicator
    this.timeIndicator = document.createElement('div');
    this.timeIndicator.className = 'text-center mb-2';
    this.timeIndicator.style.display = 'none';
    this.timeIndicator.innerHTML = `<small class="text-muted">${this.formatTime(this.currentTime)}</small>`;
    this.chatBody.appendChild(this.timeIndicator);

    // Message bubble
    this.messageBubble = document.createElement('div');
    this.messageBubble.className = 'bg-white p-3 rounded shadow-sm';
    this.messageBubble.style.position = 'relative';
    this.messageBubble.style.maxWidth = '90%';
    this.messageBubble.style.marginLeft = '0';
    this.messageBubble.style.marginBottom = '16px';
    this.messageBubble.style.display = 'none';
    
    // Message bubble arrow
    this.messageBubbleArrow = document.createElement('div');
    this.messageBubbleArrow.style.position = 'absolute';
    this.messageBubbleArrow.style.top = '0';
    this.messageBubbleArrow.style.left = '-10px';
    this.messageBubbleArrow.style.width = '0';
    this.messageBubbleArrow.style.height = '0';
    this.messageBubbleArrow.style.borderTop = '10px solid transparent';
    this.messageBubbleArrow.style.borderRight = '10px solid white';
    this.messageBubbleArrow.style.borderBottom = '10px solid transparent';
    this.messageBubble.appendChild(this.messageBubbleArrow);

    // Message content
    this.messageBubble.innerHTML += `
      <p>Hello! Thanks for connecting with <strong>Quickship PVT Limited</strong>.</p>
      <p class="mt-2">We're here to help you with your logistics and shipping needs across East Africa and beyond.</p>
      <p class="mt-2">Our services include:</p>
      <ul class="pl-3">
        <li>Customs clearing & forwarding</li>
        <li>Air, sea & land freight</li>
        <li>Cargo storage</li>
        <li>Logistics consulting</li>
      </ul>
      <p class="mt-2">How can we assist you today?</p>
    `;
    this.chatBody.appendChild(this.messageBubble);

    // Chat footer
    this.chatFooter = document.createElement('div');
    this.chatFooter.className = 'card-footer d-flex justify-content-center py-3';
    this.chatFooter.style.borderTop = '1px solid rgba(0,0,0,.125)';
    
    // Start chat button
    this.startChatButton = document.createElement('button');
    this.startChatButton.className = 'btn btn-success';
    this.startChatButton.style.display = 'none';
    this.startChatButton.innerHTML = '<i class="fab fa-whatsapp mr-2"></i>Start Chat';
    this.chatFooter.appendChild(this.startChatButton);

    // Assemble chat panel
    this.chatPanel.appendChild(this.chatHeader);
    this.chatPanel.appendChild(this.chatBody);
    this.chatPanel.appendChild(this.chatFooter);

    // Add elements to container
    this.container.appendChild(this.chatPanel);
    this.container.appendChild(this.button);

    // Append the container to the body
    document.body.appendChild(this.container);
  }

  setupEventListeners() {
    // Toggle chat when button is clicked
    this.button.addEventListener('click', () => {
      this.toggleChat();
    });

    // Close chat when close button is clicked
    this.closeButton.addEventListener('click', () => {
      this.toggleChat();
    });

    // Start WhatsApp chat when button is clicked
    this.startChatButton.addEventListener('click', () => {
      this.startWhatsAppChat();
    });

    // Close chat when clicking outside
    document.addEventListener('mousedown', (event) => {
      if (this.isOpen && 
          !this.chatPanel.contains(event.target) && 
          !this.button.contains(event.target)) {
        this.toggleChat();
      }
    });

    // Update time periodically
    setInterval(() => {
      this.updateTime();
    }, 60000); // Update every minute
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      // Show chat panel
      this.chatPanel.style.display = 'flex';
      this.notificationDot.style.display = 'none';
      
      // Show loading
      this.isLoading = true;
      this.loadingIndicator.style.display = 'flex';
      this.timeIndicator.style.display = 'none';
      this.messageBubble.style.display = 'none';
      this.startChatButton.style.display = 'none';
      
      // Simulate loading with timeout
      setTimeout(() => {
        this.isLoading = false;
        this.loadingIndicator.style.display = 'none';
        this.timeIndicator.style.display = 'block';
        this.messageBubble.style.display = 'block';
        this.startChatButton.style.display = 'block';
        this.showContent = true;
      }, 1500);
    } else {
      // Hide chat panel
      this.chatPanel.style.display = 'none';
      this.showContent = false;
    }
  }

  startWhatsAppChat() {
    try {
      // Format phone number (remove non-digits)
      const formattedPhone = this.options.phoneNumber.replace(/[^\d+]/g, '');
      
      // Encode the message
      const message = encodeURIComponent(this.options.defaultMessage);
      
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${formattedPhone}?text=${message}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      alert('Could not open WhatsApp. Please try again or contact us directly.');
    }
  }

  updateTime() {
    this.currentTime = new Date();
    if (this.timeIndicator) {
      this.timeIndicator.innerHTML = `<small class="text-muted">${this.formatTime(this.currentTime)}</small>`;
    }
  }

  formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

// Initialize with default options when script loads
document.addEventListener('DOMContentLoaded', () => {
  // You can customize options here
  window.whatsappButton = new WhatsAppButton({
    phoneNumber: "+254758464586",
    defaultMessage: "Hello, I'd like to inquire about your logistics services.",
    headerColor: "#FF4800",
    buttonColor: "#25D366" // WhatsApp green
  });
});