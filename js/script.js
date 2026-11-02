// Mobile menu
const toggle = document.querySelector(".toggle"), menu = document.querySelector(".menu");
toggle.addEventListener("click", () => {
  toggle.setAttribute("aria-expanded", menu.classList.toggle("open"));
});

// Highlight current page, set footer year
const page = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".menu a").forEach(a => {
  if (a.getAttribute("href") === page) a.classList.add("active");
});
document.getElementById("year").textContent = new Date().getFullYear();

// If a photo is missing, remove it so the gradient placeholder shows
document.querySelectorAll(".ph img").forEach(img => {
  const drop = () => img.remove();
  img.addEventListener("error", drop);
  if (img.complete && img.naturalWidth === 0) drop();
});

// Back to top button
const topBtn = document.getElementById("top");
window.addEventListener("scroll", () => topBtn.classList.toggle("show", window.scrollY > 500));
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Trek filter (home page)
document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach(b => b.classList.remove("on"));
    btn.classList.add("on");
    const level = btn.dataset.filter;
    document.querySelectorAll(".card[data-level]").forEach(c => {
      c.classList.toggle("hide", level !== "all" && c.dataset.level !== level);
    });
  });
});

// Cost planner (home page)
const trek = document.getElementById("trek"), people = document.getElementById("people");
function estimate() {
  const n = Math.max(1, parseInt(people.value) || 1);
  let total = parseInt(trek.value) * n, text = "";
  if (n >= 4) { total *= 0.9; text = " (10% group discount applied)"; }
  document.getElementById("total").textContent = "$" + Math.round(total).toLocaleString();
  document.getElementById("discount").textContent = text;
}
if (trek) { trek.addEventListener("change", estimate); people.addEventListener("input", estimate); estimate(); }

// Contact form validation
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const v = id => document.getElementById(id).value.trim();
    const show = (id, msg) => { document.getElementById(id + "Err").textContent = msg; return msg === ""; };
    const ok = [
      show("fullname", v("fullname").length >= 2 ? "" : "Enter your name."),
      show("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email")) ? "" : "Enter a valid email address."),
      show("phone", v("phone") === "" || /^9[78][0-9]{8}$/.test(v("phone")) ? "" : "Use a 10-digit Nepali mobile number, for example 98XXXXXXXX."),
      show("message", v("message").length >= 10 ? "" : "Write at least 10 characters.")
    ].every(Boolean);
    document.getElementById("thanks").textContent = ok
      ? "Thank you, " + v("fullname") + ". We will reply within two days." : "";
    if (ok) form.reset();
  });
}
