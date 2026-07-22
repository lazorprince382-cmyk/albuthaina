(function () {
  "use strict";

  const section = document.querySelector("[data-updates-section]");
  const grid = document.querySelector("[data-updates-grid]");
  if (!section || !grid) return;

  const safeImagePath = (value) => {
    if (typeof value !== "string") return "";
    return /^\/?assets\/uploads\/[a-zA-Z0-9._/-]+\.(?:avif|gif|jpe?g|png|webp)$/i.test(value) ? value : "";
  };

  const safeVideoPath = (value) => {
    if (typeof value !== "string") return "";
    return /^\/?assets\/uploads\/[a-zA-Z0-9._/-]+\.(?:mp4|webm)$/i.test(value) ? value : "";
  };

  const safeVideoUrl = (value) => {
    if (typeof value !== "string" || !value.trim()) return "";
    try {
      const url = new URL(value);
      return url.protocol === "https:" ? url.href : "";
    } catch (_) {
      return "";
    }
  };

  const formatDate = (value) => {
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("en-UG", { dateStyle: "long" }).format(date);
  };

  const makeCard = (update) => {
    const article = document.createElement("article");
    article.className = "update-card";

    const imagePath = safeImagePath(update.image);
    if (imagePath) {
      const image = document.createElement("img");
      image.className = "update-card__image";
      image.src = imagePath;
      image.alt = update.alt_text || `Field update: ${update.title}`;
      image.loading = "lazy";
      image.decoding = "async";
      article.appendChild(image);
    }

    const videoPath = safeVideoPath(update.video_file);
    if (videoPath) {
      const video = document.createElement("video");
      video.className = "update-card__video";
      video.src = videoPath;
      video.controls = true;
      video.preload = "metadata";
      video.setAttribute("playsinline", "");
      video.setAttribute("aria-label", `Video update: ${update.title}`);
      article.appendChild(video);
    }

    const body = document.createElement("div");
    body.className = "update-card__body";

    const date = document.createElement("time");
    date.className = "update-card__date";
    date.dateTime = update.date;
    date.textContent = formatDate(update.date);

    const title = document.createElement("h3");
    title.textContent = update.title;

    const summary = document.createElement("p");
    summary.textContent = update.summary;

    body.append(date, title, summary);

    const videoUrl = safeVideoUrl(update.video_url);
    if (videoUrl) {
      const link = document.createElement("a");
      link.className = "update-card__link";
      link.href = videoUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Watch video ->";
      body.appendChild(link);
    }

    article.appendChild(body);
    return article;
  };

  fetch("content/updates.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Updates could not be loaded");
      return response.json();
    })
    .then((data) => {
      const updates = Array.isArray(data.updates) ? data.updates : [];
      const published = updates
        .filter((item) => item && item.published !== false && item.title && item.date && item.summary)
        .sort((a, b) => String(b.date).localeCompare(String(a.date)))
        .slice(0, 12);

      if (!published.length) return;
      published.forEach((update) => grid.appendChild(makeCard(update)));
      section.hidden = false;
    })
    .catch(() => {
      section.hidden = true;
    });
})();
