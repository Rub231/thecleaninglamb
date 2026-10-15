/* ==========================================================================
   The Cleaning Lamb Co. — script
   Small, dependency-free. Handles the mobile menu, header shadow,
   scroll reveal and the quote form.
   ========================================================================== */
(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  /* ---------- Footer year ---------- */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  const menu = $("#menu");
  const toggle = $("#menu-toggle");

  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  $$("a", menu).forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  /* ---------- Header shadow on scroll ---------- */
  const header = $("#site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Quote request on WhatsApp ----------
     Opens WhatsApp with the request already written; the visitor taps send.
     Works on any host with no server or account. The number comes from
     data-whatsapp on the form (digits only, with country code). */
  const form = $("#quote-form");
  const status = $("#form-status");

  function setStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle("is-error", isError);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const f = form.elements;
    const name = f.name.value.trim();
    const phone = f.phone.value.trim();
    const service = f.service.value.trim();
    if (!name || !phone || !service) {
      setStatus("Please add your name, phone and service first.", true);
      return;
    }

    const note = f.message.value.trim();
    const lines = [
      "Hi, I would like a quote.",
      "Name: " + name,
      "Phone: " + phone,
      "Service: " + service,
      note ? "Details: " + note : "",
    ].filter(Boolean);

    const number = (form.dataset.whatsapp || "").replace(/\D/g, "");
    const url = "https://wa.me/" + number + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
    setStatus("WhatsApp is opening. Tap send there to finish your request.");
  });
  /* ---------- Phone links inside a preview frame ----------
     Phone links (tel:) do nothing when the page is shown inside another page,
     such as a preview frame. In that case show the number with a Copy button
     instead. On the real website this never runs and the link dials normally. */
  let framed = false;
  try { framed = window.self !== window.top; } catch (error) { framed = true; }

  if (framed) {
    const toast = document.createElement("div");
    toast.className = "call-toast";
    toast.hidden = true;
    toast.setAttribute("role", "status");
    toast.innerHTML = '<span class="call-toast__text"></span><button type="button" class="call-toast__copy">Copy number</button><button type="button" class="call-toast__close" aria-label="Close">×</button>';
    document.body.appendChild(toast);
    const text = $(".call-toast__text", toast);
    const copy = $(".call-toast__copy", toast);
    let timer;

    $$("a[href^='tel:']").forEach((link) => link.addEventListener("click", (event) => {
      event.preventDefault();
      const number = link.getAttribute("href").replace("tel:", "");
      const pretty = number.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3");
      text.textContent = "Call " + pretty;
      copy.textContent = "Copy number";
      copy.onclick = async () => {
        try { await navigator.clipboard.writeText(number); copy.textContent = "Copied"; }
        catch (error) { copy.textContent = pretty; }
      };
      toast.hidden = false;
      clearTimeout(timer);
      timer = setTimeout(() => { toast.hidden = true; }, 12000);
    }));
    $(".call-toast__close", toast).addEventListener("click", () => { toast.hidden = true; });
  }
})();
