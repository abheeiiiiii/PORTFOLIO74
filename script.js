function submitForm(event) {
  event.preventDefault();

  const name = document.querySelector("input[name='name']").value;
  const email = document.querySelector("input[name='email']").value;
  const message = document.querySelector("textarea[name='message']").value;

  const form = event.target;

  const whatsappMessage = `Hello Abhinav,\n\nYou received a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\n-------------------\n📩 Sent from Portfolio Website`;
  const encodedMsg = encodeURIComponent(whatsappMessage);
  const whatsappURL = `https://wa.me/917439022306?text=${encodedMsg}`;

  form.submit();

  setTimeout(() => {
    window.open(whatsappURL, "_blank");
    form.reset();
    alert("✅ Your message has been sent successfully!");
  }, 500);
}

const themeIcon = document.getElementById("themeIcon");

function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark");
    themeIcon.textContent = "🌞";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    themeIcon.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
}

if (localStorage.getItem("theme") === "dark") {
  setTheme(true);
} else {
  setTheme(false);
}

themeIcon.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  setTheme(!isDark);
});

const typedText = document.getElementById("typedText");
const textArray = ["Abhinav Tiwari", "Web Developer", "Problem Solver"];
let arrayIndex = 0;
let charIndex = 0;

function typeWriter() {
  if (charIndex < textArray[arrayIndex].length) {
    typedText.textContent += textArray[arrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 100);
  } else {
    setTimeout(eraseWriter, 1200);
  }
}

function eraseWriter() {
  if (charIndex > 0) {
    typedText.textContent = textArray[arrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseWriter, 60);
  } else {
    arrayIndex = (arrayIndex + 1) % textArray.length;
    setTimeout(typeWriter, 200);
  }
}

window.onload = () => {
  typeWriter();
};
