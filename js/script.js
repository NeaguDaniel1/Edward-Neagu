/* ==========================================================
   Orizont Travel – interactivitate
   Funcționează și offline (de pe stick), fără servere externe.
   ========================================================== */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const euro = (n) => Math.round(n).toLocaleString("ro-RO") + " €";
  const findDest = (id) => DESTINATII.find((d) => d.id === id);
  const params = new URLSearchParams(location.search);
  let io; // IntersectionObserver pentru animațiile la scroll

  /* ---------- meniu mobil ---------- */
  const toggle = $(".nav-toggle");
  const links = $(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
    });
  }

  /* ---------- link activ în meniu ---------- */
  const page = location.pathname.split("/").pop().replace(".html", "") || "index";
  $$(".nav-links a:not(.btn)").forEach((a) => {
    if (a.getAttribute("href").replace(".html", "") === page) a.classList.add("active");
  });

  /* ---------- anul curent în footer ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg) {
    let el = $(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 3500);
  }

  /* ---------- modal ---------- */
  let modal;
  function openModal(html) {
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = '<div class="modal-box" role="dialog" aria-modal="true"><button class="modal-close" aria-label="Închide">×</button><div class="modal-inner"></div></div>';
      document.body.appendChild(modal);
      modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.closest(".modal-close") || e.target.closest("[data-close]")) closeModal();
      });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
    }
    $(".modal-inner", modal).innerHTML = html;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    $(".modal-close", modal).focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function openDest(id) {
    const d = findDest(id);
    if (!d) return;
    openModal(`
      <div class="modal-img"><img src="${d.img}" alt="${d.nume}, ${d.tara}"></div>
      <div class="modal-content">
        <span class="eyebrow">${CATEGORII[d.categorie]} · ${d.zile} zile</span>
        <h2>${d.nume}, ${d.tara}</h2>
        <p class="rating">★ ${d.rating} / 5</p>
        <p style="margin-top:10px">${d.descriere}</p>
        <ul class="check-list">${d.include.map((i) => `<li>${i}</li>`).join("")}</ul>
        <div class="modal-actions">
          <div class="price"><small>de la</small> ${euro(d.pret)}<small> / persoană</small></div>
          <a class="btn" href="rezervare.html?dest=${d.id}">Rezervă acum</a>
        </div>
      </div>`);
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-detalii]");
    if (btn) openDest(btn.dataset.detalii);
  });

  /* ---------- carduri destinații ---------- */
  function cardHTML(d) {
    return `
      <article class="card reveal">
        <div class="card-img">
          <img src="${d.img}" alt="${d.nume}, ${d.tara}" loading="lazy">
          <span class="badge ${d.popular ? "badge-hot" : ""}">${d.badge}</span>
        </div>
        <div class="card-body">
          <div class="card-meta"><span>📍 ${d.tara}</span><span class="rating">★ ${d.rating}</span></div>
          <h3>${d.nume}</h3>
          <p>${d.scurt}</p>
          <div class="tags"><span class="tag">${CATEGORII[d.categorie]}</span><span class="tag">${d.zile} zile</span></div>
          <div class="card-foot">
            <div class="price"><small>de la</small><br>${euro(d.pret)}<small> /pers</small></div>
            <button class="btn btn-sm" data-detalii="${d.id}">Detalii</button>
          </div>
        </div>
      </article>`;
  }

  // pagina principală: destinații populare
  const popular = $('[data-destinatii="populare"]');
  if (popular) popular.innerHTML = DESTINATII.filter((d) => d.popular).map(cardHTML).join("");

  // pagina de destinații: toate, cu filtre, căutare și sortare
  const toate = $('[data-destinatii="toate"]');
  if (toate) {
    let filtru = CATEGORII[params.get("cat")] ? params.get("cat") : "toate";
    const cauta = $("#cauta");
    const sortare = $("#sortare");

    const render = () => {
      const text = (cauta ? cauta.value : "").trim().toLowerCase();
      let lista = DESTINATII.filter((d) =>
        (filtru === "toate" || d.categorie === filtru) &&
        (d.nume + " " + d.tara + " " + d.scurt).toLowerCase().includes(text)
      );
      const s = sortare ? sortare.value : "";
      if (s === "pret-asc") lista.sort((a, b) => a.pret - b.pret);
      if (s === "pret-desc") lista.sort((a, b) => b.pret - a.pret);
      if (s === "rating") lista.sort((a, b) => b.rating - a.rating);
      toate.innerHTML = lista.length
        ? lista.map(cardHTML).join("")
        : '<p class="empty">😕 Nu am găsit nicio destinație. Încearcă alt cuvânt.</p>';
      observeReveal();
    };

    $$(".chip[data-filter]").forEach((chip) => {
      chip.classList.toggle("active", chip.dataset.filter === filtru);
      chip.addEventListener("click", () => {
        filtru = chip.dataset.filter;
        $$(".chip[data-filter]").forEach((c) => c.classList.toggle("active", c === chip));
        render();
      });
    });
    if (cauta) cauta.addEventListener("input", render);
    if (sortare) sortare.addEventListener("change", render);
    render();
  }

  // pagina de oferte
  const oferteBox = $("[data-oferte]");
  if (oferteBox) {
    oferteBox.innerHTML = OFERTE.map((o) => {
      const d = findDest(o.id);
      const nou = d.pret * (1 - o.reducere / 100);
      return `
        <article class="card reveal">
          <div class="card-img">
            <img src="${d.img}" alt="${d.nume}, ${d.tara}" loading="lazy">
            <span class="badge badge-hot">-${o.reducere}%</span>
            <span class="badge badge-right">${o.tip}</span>
          </div>
          <div class="card-body">
            <div class="card-meta"><span>📍 ${d.tara}</span><span>🗓️ ${d.zile} zile</span></div>
            <h3>${d.nume}</h3>
            <p>${o.plecare}</p>
            <div class="card-foot">
              <div class="price"><span class="old-price">${euro(d.pret)}</span>${euro(nou)}<small> /pers</small></div>
              <a class="btn btn-sm" href="rezervare.html?dest=${d.id}&oferta=1">Rezervă</a>
            </div>
          </div>
        </article>`;
    }).join("");
  }

  // selectul de destinații din formularul de căutare (pagina principală)
  $$("select[data-lista-destinatii]").forEach((sel) => {
    sel.innerHTML = DESTINATII.map((d) => `<option value="${d.id}">${d.nume} – ${d.tara}</option>`).join("");
  });

  /* ---------- numărătoare inversă (până la sfârșitul lunii) ---------- */
  const cd = $("[data-countdown]");
  if (cd) {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const diff = Math.max(0, end - new Date());
      const s = Math.floor(diff / 1000);
      $("[data-z]", cd).textContent = Math.floor(s / 86400);
      $("[data-h]", cd).textContent = pad(Math.floor((s % 86400) / 3600));
      $("[data-m]", cd).textContent = pad(Math.floor((s % 3600) / 60));
      $("[data-s]", cd).textContent = pad(s % 60);
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- validare formulare ---------- */
  function validateForm(form) {
    let ok = true;
    $$("input, select, textarea", form).forEach((el) => {
      const field = el.closest(".field");
      if (!field) return;
      const valid = el.checkValidity();
      field.classList.toggle("invalid", !valid);
      if (!valid && ok) el.focus();
      ok = ok && valid;
    });
    return ok;
  }
  $$("form[novalidate]").forEach((form) => {
    form.addEventListener("input", (e) => {
      const field = e.target.closest(".field.invalid");
      if (field && e.target.checkValidity()) field.classList.remove("invalid");
    });
  });

  // newsletter
  $$("[data-newsletter]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = $("input", form);
      if (!input.checkValidity() || !input.value) {
        toast("⚠️ Introdu o adresă de e-mail validă.");
        input.focus();
        return;
      }
      form.reset();
      toast("🎉 Te-ai abonat! Vei primi cele mai bune oferte.");
    });
  });

  // formular de contact
  const contactForm = $("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateForm(contactForm)) return;
      const nume = $("#c-nume").value.trim().split(" ")[0];
      contactForm.reset();
      openModal(`
        <div class="modal-content text-center">
          <div class="success-icon">✓</div>
          <h2>Mulțumim, ${nume}!</h2>
          <p style="margin:10px 0 22px">Mesajul tău a fost trimis. Un consultant îți va răspunde în maximum 24 de ore.</p>
          <button class="btn" data-close>Închide</button>
        </div>`);
    });
  }

  /* ---------- rezervare + calculator de preț ---------- */
  const booking = $("#booking-form");
  if (booking) {
    const sel = $("#dest");
    sel.innerHTML = DESTINATII.map((d) => `<option value="${d.id}">${d.nume} – ${d.tara} (${d.zile} zile)</option>`).join("");
    if (findDest(params.get("dest"))) sel.value = params.get("dest");

    const pers = parseInt(params.get("pers"), 10);
    if (pers >= 1 && pers <= 10) $("#adulti").value = pers;

    const dataInput = $("#data");
    const azi = new Date();
    azi.setDate(azi.getDate() + 1);
    dataInput.min = `${azi.getFullYear()}-${String(azi.getMonth() + 1).padStart(2, "0")}-${String(azi.getDate()).padStart(2, "0")}`;
    if (params.get("data") && params.get("data") >= dataInput.min) dataInput.value = params.get("data");

    // oferta din pagina de oferte se aplică doar destinației respective
    const ofertaDest = params.get("oferta") ? params.get("dest") : null;

    const MASA = { mic: { nume: "Mic dejun", pret: 0 }, demi: { nume: "Demipensiune", pret: 15 }, all: { nume: "All inclusive", pret: 35 } };
    const CAMERA = { standard: { nume: "Standard", x: 0 }, superior: { nume: "Superior", x: 0.15 }, suita: { nume: "Suită", x: 0.35 } };

    const update = () => {
      const d = findDest(sel.value);
      const adulti = Math.min(10, Math.max(1, parseInt($("#adulti").value, 10) || 1));
      const copii = Math.min(6, Math.max(0, parseInt($("#copii").value, 10) || 0));
      const camera = CAMERA[$('input[name="camera"]:checked').value];
      const masa = MASA[$("#masa").value];
      const nopti = d.zile - 1;
      const persoane = adulti + copii;

      const rows = [];
      let total = 0;
      const add = (label, val, cls = "") => { rows.push(`<div class="summary-row ${cls}"><span>${label}</span><span>${val < 0 ? "−" + euro(-val) : euro(val)}</span></div>`); total += val; };

      add(`Adulți: ${adulti} × ${euro(d.pret)}`, adulti * d.pret);
      if (copii) add(`Copii: ${copii} × ${euro(d.pret * 0.7)} (-30%)`, copii * d.pret * 0.7);
      const baza = total;
      if (camera.x) add(`Cameră ${camera.nume} (+${camera.x * 100}%)`, baza * camera.x);
      if (masa.pret) add(`${masa.nume}: ${persoane} pers × ${nopti} nopți`, masa.pret * persoane * nopti);
      if ($("#asigurare").checked) add(`Asigurare: ${persoane} × 12 €`, 12 * persoane);
      if ($("#transfer").checked) add("Transfer aeroport", 25);

      const oferta = ofertaDest === d.id ? OFERTE.find((o) => o.id === d.id) : null;
      if (oferta) add(`Ofertă ${oferta.tip} (-${oferta.reducere}%)`, -baza * oferta.reducere / 100, "discount");

      const cod = $("#cod").value.trim().toUpperCase();
      const hint = $("#cod-hint");
      if (cod && CODURI[cod]) {
        add(`Cod ${cod} (-${CODURI[cod]}%)`, -total * CODURI[cod] / 100, "discount");
        hint.textContent = `✓ Cod valid: ${CODURI[cod]}% reducere`;
        hint.className = "hint ok";
      } else {
        hint.textContent = cod ? "✗ Cod invalid" : "Încearcă codul SCOALA10";
        hint.className = cod ? "hint bad" : "hint";
      }

      $("#sum-img").src = d.img;
      $("#sum-img").alt = d.nume + ", " + d.tara;
      $("#sum-nume").textContent = `${d.nume}, ${d.tara}`;
      $("#sum-info").textContent = `${d.zile} zile / ${nopti} nopți · ${persoane} ${persoane === 1 ? "persoană" : "persoane"} · ${masa.nume}`;
      $("#sum-rows").innerHTML = rows.join("");
      $("#sum-total").textContent = euro(total);
      return { d, total, persoane };
    };

    booking.addEventListener("input", update);
    booking.addEventListener("change", update);
    update();

    booking.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateForm(booking)) {
        toast("⚠️ Completează câmpurile marcate cu roșu.");
        return;
      }
      const { d, total, persoane } = update();
      const nr = "OT-" + Math.floor(100000 + Math.random() * 900000);
      const data = new Date(dataInput.value + "T12:00").toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });
      openModal(`
        <div class="modal-content text-center">
          <div class="success-icon">✓</div>
          <h2>Rezervare înregistrată!</h2>
          <p style="margin:10px 0 18px">Mulțumim, <strong>${$("#nume").value.trim()}</strong>! Confirmarea a fost trimisă la <strong>${$("#email").value.trim()}</strong>.</p>
          <div style="text-align:left;margin-bottom:22px">
            <div class="summary-row"><span>Număr rezervare</span><span>${nr}</span></div>
            <div class="summary-row"><span>Destinație</span><span>${d.nume}</span></div>
            <div class="summary-row"><span>Data plecării</span><span>${data}</span></div>
            <div class="summary-row"><span>Persoane</span><span>${persoane}</span></div>
            <div class="summary-total"><span>Total</span><span>${euro(total)}</span></div>
          </div>
          <a class="btn" href="index.html">Înapoi la pagina principală</a>
        </div>`);
    });
  }

  /* ---------- contoare animate ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const start = performance.now();
    const dur = 1600;
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const val = target * (1 - Math.pow(1 - p, 3));
      el.textContent = Math.round(val).toLocaleString("ro-RO") + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- apariție la scroll ---------- */
  function observeReveal() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach((el) => el.classList.add("visible"));
      $$("[data-count]").forEach(animateCount);
      return;
    }
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("visible");
          if (en.target.dataset.count) animateCount(en.target);
          io.unobserve(en.target);
        });
      }, { threshold: 0.12 });
    }
    $$(".reveal:not(.visible), [data-count]:not(.counted)").forEach((el) => {
      if (el.dataset.count) el.classList.add("counted");
      io.observe(el);
    });
  }
  observeReveal();

  /* ---------- buton „sus” ---------- */
  const top = document.createElement("button");
  top.className = "to-top";
  top.setAttribute("aria-label", "Înapoi sus");
  top.textContent = "↑";
  document.body.appendChild(top);
  top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => top.classList.toggle("show", window.scrollY > 500), { passive: true });
})();
