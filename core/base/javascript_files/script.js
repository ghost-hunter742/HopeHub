const toggleBtn = document.querySelector(".toggleBtn");
const taskbar = document.querySelector(".taskbar-menu");
const submenuParents = document.querySelectorAll(".has-submenu");
const iframe = document.getElementById("frame1");

/* ------------------------
   TOGGLE TASKBAR
------------------------- */
toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  taskbar.classList.toggle("open");
});

/* ------------------------
   CLOSE ON OUTSIDE CLICK
------------------------- */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".taskbar-menu") && !e.target.closest(".toggleBtn")) {
    taskbar.classList.remove("open");
    closeAllSubmenus();
  }
});

/* ------------------------
   STOP BUBBLING INSIDE
------------------------- */
taskbar.addEventListener("click", (e) => {
  e.stopPropagation();
});

/* ------------------------
   SUBMENU HOVER CONTROL
------------------------- */
submenuParents.forEach(item => {
  const submenu = item.querySelector(".submenu");

  item.addEventListener("mouseenter", () => {
    submenu.style.display = "block";
  });

  item.addEventListener("mouseleave", () => {
    submenu.style.display = "none";
  });
});

/* ------------------------
   CLOSE ON IFRAME CLICK
------------------------- */
iframe.addEventListener("load", () => {
  iframe.contentWindow.addEventListener("click", () => {
    taskbar.classList.remove("open");
    closeAllSubmenus();
  });
});

/* ------------------------
   HELPER
------------------------- */
function closeAllSubmenus() {
  document.querySelectorAll(".submenu").forEach(menu => {
    menu.style.display = "none";
  });
}

/* ------------------------
   CLOSE TASKBAR ON LINK CLICK
------------------------- */
const menuLinks = document.querySelectorAll('.taskbar-menu a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    taskbar.classList.remove('open');  // Close the taskbar
    closeAllSubmenus();  // Close any open submenus
  });
});