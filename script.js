document.addEventListener('DOMContentLoaded', () => {
      
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    once: true,
    offset: 50
  });

  // --- Theme Toggling Logic ---
  const themeToggle = document.getElementById('theme-toggle');
  const themeIconDark = document.getElementById('theme-icon-dark');
  const themeIconLight = document.getElementById('theme-icon-light');
  const htmlEl = document.documentElement;

  // Function to set the theme
  const setTheme = (isDark) => {
    if (isDark) {
      htmlEl.classList.add('dark');
      themeIconDark.classList.remove('hidden');
      themeIconLight.classList.add('hidden');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlEl.classList.remove('dark');
      themeIconDark.classList.add('hidden');
      themeIconLight.classList.remove('hidden');
      localStorage.setItem('theme', 'light');
    }
  };

  // Check for saved theme in localStorage or user's OS preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    setTheme(true);
  } else {
    setTheme(false);
  }
  
  // Event listener for the theme toggle button
  themeToggle.addEventListener('click', () => {
    setTheme(!htmlEl.classList.contains('dark'));
  });


  // --- Typing Animation Logic ---
  const typedTextSpan = document.getElementById('typed-text');
  const textArray = ["Hi, I'm Abhinav Tiwari.", "I'm a Web Developer.", "I build things for the web."];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }
  
  // Start the typing animation
  setTimeout(type, newTextDelay);


  // --- Contact Form Submission Logic ---
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success-message');

  contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the default submission
    const form = event.target;
    
    // Construct WhatsApp message
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const message = form.elements['message'].value;
    const whatsappMessage = `Hello Abhinav,\n\nYou have a new message from your portfolio:\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
    const encodedMsg = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/917439022306?text=${encodedMsg}`;

    // Set form target to the hidden iframe
    form.target = 'hidden_iframe';
    
    // Submit the form natively (will load in the iframe)
    form.submit();

    // After a short delay, open WhatsApp and reset the form
    setTimeout(() => {
        window.open(whatsappURL, "_blank");
        
        successMessage.style.opacity = '1';
        form.reset();
        form.target = ''; // Clear the target

        // Hide the success message after a few seconds
        setTimeout(() => { 
            successMessage.style.opacity = '0';
        }, 4000);
    }, 500);
  });
});
