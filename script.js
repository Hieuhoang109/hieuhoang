document.addEventListener('DOMContentLoaded', () => {
  // --- About Me Modal ---
  const aboutBtn = document.getElementById('about-btn');
  const aboutModal = document.getElementById('about-modal');
  const closeBtn = document.getElementById('close-btn');

  aboutBtn?.addEventListener('click', () => {
    openModal(aboutModal);
  });

  closeBtn?.addEventListener('click', () => {
    closeModal(aboutModal);
  });

  // --- Donate Modal ---
  const donateBtn = document.getElementById('donate-btn');
  const donateModal = document.getElementById('donate-modal');
  const donateCloseBtn = document.getElementById('donate-close-btn');
  const donateStepAmount = document.getElementById('donate-step-amount');
  const donateStepQr = document.getElementById('donate-step-qr');
  const donateInput = document.getElementById('donate-amount-input');
  const donateNameInput = document.getElementById('donate-name-input');
  const donateMessageInput = document.getElementById('donate-message-input');
  const donateSubmitBtn = document.getElementById('donate-submit-btn');
  const donateConfirmDoneBtn = document.getElementById('donate-confirm-done-btn');
  const donateError = document.getElementById('donate-error');
  const displayAmount = document.getElementById('display-amount');
  const quickButtons = document.querySelectorAll('.quick-btn');

  // Mở modal Donate
  donateBtn?.addEventListener('click', () => {
    resetDonateModal();
    openModal(donateModal);
    donateInput?.focus();
  });

  donateCloseBtn?.addEventListener('click', () => {
    closeModal(donateModal);
  });

  // Chọn nhanh mức tiền
  quickButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      quickButtons.forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      const amount = btn.getAttribute('data-amount');
      if (donateInput && amount) {
        donateInput.value = formatNumber(amount);
        if (donateError) donateError.textContent = '';
      }
    });
  });

  // Format khi gõ số tiền
  donateInput?.addEventListener('input', (e) => {
    quickButtons.forEach((b) => b.classList.remove('selected'));
    if (donateError) donateError.textContent = '';
    const rawVal = e.target.value.replace(/\D/g, '');
    e.target.value = rawVal ? formatNumber(rawVal) : '';
  });

  // Nhấn Enter để xác nhận
  [donateInput, donateNameInput, donateMessageInput].forEach((inputEl) => {
    inputEl?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        submitDonateAmount();
      }
    });
  });

  // Xác nhận số tiền & chuyển sang bước QR
  donateSubmitBtn?.addEventListener('click', () => {
    submitDonateAmount();
  });

  // Nút xác nhận ở màn hình QR -> đóng modal luôn
  donateConfirmDoneBtn?.addEventListener('click', () => {
    closeModal(donateModal);
  });

  async function submitDonateAmount() {
    const rawVal = donateInput?.value.replace(/\D/g, '') || '';
    const numericAmount = parseInt(rawVal, 10);
    const donorName = donateNameInput?.value.trim() || 'Ẩn danh';
    const donorMessage = donateMessageInput?.value.trim() || '';

    if (!numericAmount || numericAmount <= 0) {
      if (donateError) donateError.textContent = 'Vui lòng nhập số tiền hợp lệ (tối thiểu 1.000đ).';
      return;
    }

    if (displayAmount) {
      displayAmount.textContent = formatNumber(numericAmount);
    }

    // Hiển thị bước QR code trước để trải nghiệm mượt mà
    if (donateStepAmount && donateStepQr) {
      donateStepAmount.style.display = 'none';
      donateStepQr.style.display = 'block';
    }

    // Lưu thông tin donate vào Firebase Firestore
    if (typeof window.saveDonation === 'function') {
      try {
        const result = await window.saveDonation(numericAmount, donorName, donorMessage);
        if (result.success) {
          console.log('Thông tin donate đã được lưu thành công trên Firebase!');
        } else {
          console.warn('Không thể ghi dữ liệu lên Firebase:', result.error);
        }
      } catch (err) {
        console.error('Lỗi khi gọi hàm saveDonation:', err);
      }
    } else {
      console.warn('Hàm saveDonation chưa được sẵn sàng từ firebase.js');
    }
  }

  function resetDonateModal() {
    if (donateInput) donateInput.value = '';
    if (donateNameInput) donateNameInput.value = '';
    if (donateMessageInput) donateMessageInput.value = '';
    if (donateError) donateError.textContent = '';
    quickButtons.forEach((b) => b.classList.remove('selected'));
    if (donateStepAmount && donateStepQr) {
      donateStepAmount.style.display = 'block';
      donateStepQr.style.display = 'none';
    }
  }

  // --- Utility functions ---
  function formatNumber(num) {
    return Number(num).toLocaleString('vi-VN');
  }

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  // Đóng modal khi click ra vùng nền đen bên ngoài
  [aboutModal, donateModal].forEach((modal) => {
    modal?.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Đóng modal khi bấm phím Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal(aboutModal);
      closeModal(donateModal);
    }
  });
});
