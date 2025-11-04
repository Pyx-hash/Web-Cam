const startButton = document.getElementById('startButton');
    const captureButton = document.getElementById('captureButton');
    const settingsButton = document.getElementById('settingsButton');
    const closeSettings = document.getElementById('closeSettings');
    const settingsPanel = document.getElementById('settingsPanel');
    const cameraSelect = document.getElementById('cameraSelect');
    const resolutionSelect = document.getElementById('resolutionSelect');
    const mirrorToggle = document.getElementById('mirrorToggle');
    const gridToggle = document.getElementById('gridToggle');
    const flashToggle = document.getElementById('flashToggle');
    const themeToggle = document.getElementById('themeToggle');
    const errorMessage = document.getElementById('errorMessage');
    const captureCanvas = document.getElementById('captureCanvas');
    const flashEffect = document.getElementById('flashEffect');
    const videoGrid = document.getElementById('videoGrid');
    const videoElements = [
      document.getElementById('video1'),
      document.getElementById('video2'),
      document.getElementById('video3'),
      document.getElementById('video4')
    ];
    let activeStream = null;

    // Open/close settings
    settingsButton.addEventListener('click', () => settingsPanel.classList.remove('translate-x-full'));
    closeSettings.addEventListener('click', () => settingsPanel.classList.add('translate-x-full'));

    // Populate cameras
    async function loadCameras() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(d => d.kind === 'videoinput');
      cameraSelect.innerHTML = videoDevices.map((d, i) => `<option value="${d.deviceId}">${d.label || 'Camera ' + (i+1)}</option>`).join('');
    }
    loadCameras();

    // Start camera
    startButton.addEventListener('click', async () => {
      startButton.classList.add('opacity-70');
      errorMessage.textContent = '';
      try {
        const [width, height] = resolutionSelect.value.split('x').map(Number);
        const constraints = { video: { deviceId: cameraSelect.value ? { exact: cameraSelect.value } : undefined, width, height }, audio: false };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        activeStream = stream;
        videoElements.forEach(v => { v.srcObject = stream; v.play(); });
        startButton.classList.add('hidden');
        captureButton.classList.remove('hidden');
      } catch (err) {
        errorMessage.textContent = "Error accessing camera.";
      } finally {
        startButton.classList.remove('opacity-70');
      }
    });

    // Mirror toggle
    mirrorToggle.addEventListener('change', e => {
      const flip = e.target.checked ? 'scaleX(1)' : 'scaleX(-1)';
      videoElements.forEach(v => v.style.transform = flip);
    });

    // Grid toggle
    gridToggle.addEventListener('change', e => {
      videoGrid.classList.toggle('border-0', !e.target.checked);
      videoGrid.classList.toggle('shadow-none', !e.target.checked);
    });

    // Flash toggle
    flashToggle.addEventListener('change', e => {
      flashEffect.style.display = e.target.checked ? 'block' : 'none';
    });

    // Theme toggle
    themeToggle.addEventListener('change', e => {
      document.body.classList.toggle('light-theme', e.target.checked);
    });

    // Capture (kept original)
    captureButton.addEventListener('click', () => {
      if (!activeStream || videoElements[0].videoWidth === 0) return;
      const video = videoElements[0];
      const vw = video.videoWidth, vh = video.videoHeight;
      captureCanvas.width = vw * 2; captureCanvas.height = vh * 2;
      const ctx = captureCanvas.getContext('2d');
      ctx.clearRect(0, 0, captureCanvas.width, captureCanvas.height);
      ctx.save(); ctx.scale(-1, 1);
      ctx.drawImage(video, -vw, 0, vw, vh);
      ctx.drawImage(video, -(vw * 2), 0, vw, vh);
      ctx.drawImage(video, -vw, vh, vw, vh);
      ctx.drawImage(video, -(vw * 2), vh, vw, vh);
      ctx.restore();
      const dataUrl = captureCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl; link.download = 'test_capture.png';
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      if (flashToggle.checked) {
        flashEffect.style.opacity = '0.8';
        setTimeout(() => flashEffect.style.opacity = '0', 100);
      }
    });
