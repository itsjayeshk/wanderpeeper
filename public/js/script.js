(() => {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    }, false);
  });
})();

(() => {
  'use strict';

  const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

  document.querySelectorAll('.image-upload-input').forEach(input => {
    input.addEventListener('change', () => {
      const file = input.files[0];
      const preview = document.getElementById(input.dataset.previewTarget);

      input.setCustomValidity('');

      if (preview) {
        if (preview.dataset.previewUrl) {
          URL.revokeObjectURL(preview.dataset.previewUrl);
          delete preview.dataset.previewUrl;
        }

        preview.classList.add('d-none');
        preview.removeAttribute('src');
      }

      if (!file) {
        return;
      }

      const extension = file.name.split('.').pop().toLowerCase();
      const isAllowed =
        allowedImageExtensions.includes(extension) &&
        allowedImageTypes.includes(file.type);

      if (!isAllowed) {
        input.setCustomValidity('Please upload a JPG, JPEG, PNG, or WEBP image.');
        return;
      }

      if (preview) {
        const previewUrl = URL.createObjectURL(file);

        preview.src = previewUrl;
        preview.dataset.previewUrl = previewUrl;
        preview.classList.remove('d-none');
      }
    });
  });
})();
