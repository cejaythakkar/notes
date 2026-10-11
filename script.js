const body = document.body;
const toggle = document.querySelector(".theme-toggle");
const toggleIcon = document.querySelector(".toggle-icon");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
  toggleIcon.textContent = "☾";
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  toggleIcon.textContent = isDark ? "☾" : "☀";
  localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal, .skill-group").forEach((element) => {
  observer.observe(element);
});
