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
      event.preventDefault();
      const data = new FormData(bookingForm);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();

      if (!/^1[3-9]\d{9}$/.test(phone)) {
        formResult.textContent = '请填写有效的 11 位手机号。';
        formResult.classList.add('visible');
        return;
      }

      const payload = {
        name,
        phone,
        product: data.get('product'),
        service: data.get('service'),
        pain: data.get('pain'),
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('latestBookingRequest', JSON.stringify(payload));
      formResult.textContent = `${name || '您好'}，预约信息已在本地记录。正式上线时可以接入 EmailJS、企业微信、飞书或后端接口，我们将在 1 个工作日内联系您。`;
      formResult.classList.add('visible');
      bookingForm.reset();
      if (quickPhone) quickPhone.value = '';
    });
  }
})();
