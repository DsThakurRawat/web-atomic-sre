/** Interactive controller logic for the Atomic-SRE landing page. */

/**
 * Initializes the interactive code-copy buttons.
 *
 * Scans the page for copy elements and binds click handlers.
 */
function initCopyButtons(): void {
  const copyButtons = document.querySelectorAll(".btn-copy");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const targetId = btn.getAttribute("data-target");
      if (!targetId) return;

      const codeElement = document.getElementById(targetId);
      if (!codeElement) return;

      const codeText = codeElement.textContent || "";
      try {
        await navigator.clipboard.writeText(codeText.trim());
        const originalText = btn.textContent || "Copy";
        btn.textContent = "Copied!";
        btn.classList.add("text-success");

        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove("text-success");
        }, 2000);
      } catch (err) {
        console.error("Failed to copy code text: ", err);
      }
    });
  });
}

/**
 * Initializes the dark/light theme toggle functionality.
 * Reads stored preference or defaults to light mode.
 */
function initThemeToggle(): void {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  // Retrieve stored theme preference safely
  try {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  } catch (e) {
    console.warn("localStorage read failed:", e);
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    try {
      const isDark = document.body.classList.contains("dark-theme");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (e) {
      console.warn("localStorage write failed:", e);
    }
  });
}

/**
 * Initializes the terminal window tabs switcher on the first fold.
 */
function initTerminalShowcase(): void {
  const tabs = document.querySelectorAll(".terminal-tab");
  const contents = document.querySelectorAll(".terminal-tab-content");
  
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));
      
      tab.classList.add("active");
      
      const targetId = tab.getAttribute("data-tab");
      if (targetId) {
        const content = document.getElementById(targetId);
        if (content) {
          content.classList.add("active");
        }
      }
    });
  });
}

function initAll() {
  try {
    initTerminalShowcase();
  } catch (e) {
    console.error(e);
  }
  try {
    initThemeToggle();
  } catch (e) {
    console.error(e);
  }
  try {
    initCopyButtons();
  } catch (e) {
    console.error(e);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
