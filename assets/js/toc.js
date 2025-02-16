document.addEventListener('DOMContentLoaded', () => {
  // Get all nav sections and corresponding content sections
  const navSections = document.querySelectorAll('[data-nav-section]');
  const contentSections = Array.from(navSections).map(nav => 
    document.querySelector(nav.dataset.navSection)
  );

  // Function to update active section
  function updateActiveSection() {
    // Get current scroll position (with some offset for better UX)
    const scrollPosition = window.scrollY + 100; 

    // Find the current section
    let currentSectionIndex = contentSections.findIndex((section, index) => {
      const nextSection = contentSections[index + 1];
      
      if (!nextSection) {
        return section.offsetTop <= scrollPosition;
      }
      
      return section.offsetTop <= scrollPosition && 
             nextSection.offsetTop > scrollPosition;
    });

    // Remove highlight from all nav items
    navSections.forEach(nav => {
      nav.classList.remove('b--brand');
      nav.classList.add('b--light-gray');
    });

    // Add highlight to current nav item
    if (currentSectionIndex >= 0) {
      navSections[currentSectionIndex].classList.remove('b--light-gray');
      navSections[currentSectionIndex].classList.add('b--brand');
    }
  }

  // Update on scroll
  window.addEventListener('scroll', updateActiveSection);
  
  // Initial update
  updateActiveSection();
}); 