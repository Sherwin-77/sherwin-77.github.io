/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  "use strict";

  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = (theme) => {
    if (
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  setTheme(getPreferredTheme());

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });

  window.addEventListener("DOMContentLoaded", () => {
    if (getPreferredTheme() === "light") {
      $("#theme-switcher > i").removeClass("fa-moon");
      if (!$("#theme-switcher > i").hasClass("fa-sun"))
        $("#theme-switcher > i").addClass("fa-sun");
    } else {
      $("#theme-switcher > i").removeClass("fa-sun");
      if (!$("#theme-switcher > i").hasClass("fa-moon"))
        $("#theme-switcher > i").addClass("fa-moon");
    }
    document.getElementById("theme-switcher").addEventListener("click", (e) => {
      $("#theme-switcher > i").toggleClass("fa-moon fa-sun");
      if (document.documentElement.getAttribute("data-bs-theme") == "dark") {
        setTheme("light");
        setStoredTheme("light");
      } else {
        setTheme("dark");
        setStoredTheme("dark");
      }
    });
    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const theme = toggle.getAttribute("data-bs-theme-value");
        setStoredTheme(theme);
        setTheme(theme);
      });
    });
  });
})();
