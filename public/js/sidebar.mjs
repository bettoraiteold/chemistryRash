const sidebarToggleBtn = document.getElementById("sidebar-toggle-btn");
const sidebarContainer = document.getElementById("sidebar-container");
sidebarToggleBtn.addEventListener("click", () => {
  sidebarContainer.classList.toggle("sidebar-container--hidden");
  sidebarToggleBtn.classList.toggle("sidebar-toggle-btn--active");
});
