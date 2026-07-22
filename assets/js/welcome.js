(function () {
  "use strict";

  const storageKey = "al-buthaina-welcome-seen";
  try {
    if (window.sessionStorage.getItem(storageKey)) return;
    window.sessionStorage.setItem(storageKey, "true");
  } catch (_) {
    // The welcome can still be shown when browser storage is unavailable.
  }

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = "assets/css/welcome.css";
  document.head.appendChild(stylesheet);

  const overlay = document.createElement("div");
  overlay.className = "visitor-welcome";
  overlay.hidden = true;
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-labelledby", "visitor-welcome-title");
  overlay.setAttribute("aria-describedby", "visitor-welcome-message");
  overlay.innerHTML = `
    <div class="visitor-welcome__card">
      <button class="visitor-welcome__close" type="button" aria-label="Close welcome message" data-welcome-close>&times;</button>
      <img class="visitor-welcome__logo" src="assets/images/al-buthaina/al-buthaina-logo-nav-transparent.png" alt="">
      <p class="visitor-welcome__eyebrow">Assalamu alaikum &middot; Welcome</p>
      <h2 id="visitor-welcome-title">Together, compassion reaches further.</h2>
      <p class="visitor-welcome__message" id="visitor-welcome-message">Welcome to Al Buthaina Relief Charity Organisation. We work alongside communities in Uganda to provide clean water, food, seasonal Islamic giving and practical humanitarian support with dignity.</p>
      <div class="visitor-welcome__actions">
        <a class="visitor-welcome__button visitor-welcome__button--primary" href="donation-page.html">Support the work</a>
        <a class="visitor-welcome__button" href="causes-list.html">Explore our programmes</a>
      </div>
      <p class="visitor-welcome__note">Give for the sake of Allah &middot; Mbale, Uganda</p>
    </div>`;
  document.body.appendChild(overlay);

  const closeButton = overlay.querySelector("[data-welcome-close]");
  const closeWelcome = () => {
    overlay.hidden = true;
    document.body.classList.remove("welcome-is-open");
  };

  closeButton.addEventListener("click", closeWelcome);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeWelcome();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) closeWelcome();
  });

  window.setTimeout(() => {
    overlay.hidden = false;
    document.body.classList.add("welcome-is-open");
    closeButton.focus();
  }, 650);
})();
