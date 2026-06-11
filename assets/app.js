(function () {
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  const progress = document.querySelector('[data-progress]');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
  }

  if (progress) {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = `${pct}%`;
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  const quickPhone = document.querySelector('#quick-phone');
  const fullPhone = document.querySelector('#phone');
  const bookingForm = document.querySelector('#booking-form');
  const formResult = document.querySelector('#form-result');

  if (quickPhone && fullPhone) {
    quickPhone.addEventListener('input', () => {
      fullPhone.value = quickPhone.value;
    });
  }

  if (bookingForm && formResult) {
    bookingForm.addEventListener('submit', (event) => {
      const data = new FormData(bookingForm);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();

      if (!/^1[3-9]\d{9}$/.test(phone)) {
        event.preventDefault();
        formResult.textContent = '请填写有效的 11 位手机号。';
        formResult.classList.add('visible');
        return;
      }

      if (!name) {
        event.preventDefault();
        formResult.textContent = '请填写姓名，方便我们联系和记录预约。';
        formResult.classList.add('visible');
        return;
      }

      formResult.textContent = '正在提交预约信息，请稍候...';
      formResult.classList.add('visible');
    });
  }
})();
