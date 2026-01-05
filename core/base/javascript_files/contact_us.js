document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.toggleBtn');
    const taskbarMenu = document.querySelector('.taskbar-menu');
    const submenuParents = document.querySelectorAll('.has-submenu');

    // 1. Toggle Sidebar Menu
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents immediate closing
            taskbarMenu.classList.toggle('open');
        });
    }

    // 2. Close Sidebar when clicking outside
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = taskbarMenu.contains(event.target);
        const isClickOnButton = toggleBtn.contains(event.target);

        if (!isClickInsideMenu && !isClickOnButton && taskbarMenu.classList.contains('open')) {
            taskbarMenu.classList.remove('open');
        }
    });

    // 3. Optional: Close sidebar after clicking a link (mobile friendly)
    const menuLinks = document.querySelectorAll('.taskbar-menu a:not(.has-submenu > a)');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                taskbarMenu.classList.remove('open');
            }
        });
    });

    // 4. Handle Submenus for Mobile (Click instead of Hover)
    submenuParents.forEach(parent => {
        parent.addEventListener('click', (e) => {
            // Only toggle if the screen is small or if you want click-to-open
            const submenu = parent.querySelector('.submenu');
            if (submenu) {
                // If the user clicks the parent text, toggle the submenu
                if (e.target === parent) {
                    const isDisplayed = window.getComputedStyle(submenu).display === 'block';
                    submenu.style.display = isDisplayed ? 'none' : 'block';
                }
            }
        });
    });
});