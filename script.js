document.addEventListener('DOMContentLoaded', () => {
  const aboutBtn = document.getElementById('about-btn');
  const aboutModal = document.getElementById('about-modal');
  const closeBtn = document.getElementById('close-btn');

  // Mở modal khi click nút About me
  aboutBtn.addEventListener('click', () => {
    aboutModal.classList.add('active');
    aboutModal.setAttribute('aria-hidden', 'false');
  });

  // Đóng modal khi click nút X
  closeBtn.addEventListener('click', () => {
    closeModal();
  });

  // Đóng modal khi click ra vùng ngoài modal content
  aboutModal.addEventListener('click', (event) => {
    if (event.target === aboutModal) {
      closeModal();
    }
  });

  // Đóng modal khi bấm phím Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && aboutModal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    aboutModal.classList.remove('active');
    aboutModal.setAttribute('aria-hidden', 'true');
  }
});
