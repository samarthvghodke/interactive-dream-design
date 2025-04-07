
// Create animated background particles
document.addEventListener('DOMContentLoaded', function() {
  // Generate particles for animated background
  const animatedBackground = document.querySelector('.animated-background');
  const colors = [
    'bg-fis-primary', 
    'bg-fis-secondary', 
    'bg-fis-accent', 
    'bg-fis-highlight'
  ];
  
  // Create 20 particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Choose a random color
    const colorClass = i % 4;
    let bgColor;
    
    switch(colorClass) {
      case 0:
        bgColor = '#1a365d'; // fis-primary
        break;
      case 1:
        bgColor = '#2c5282'; // fis-secondary
        break;
      case 2:
        bgColor = '#4299e1'; // fis-accent
        break;
      case 3:
        bgColor = '#63b3ed'; // fis-highlight
        break;
    }
    
    // Set particle properties
    const size = Math.random() * 8 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    particle.style.backgroundColor = bgColor;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.opacity = '0.1';
    particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
    
    animatedBackground.appendChild(particle);
  }
  
  // Handle file upload area interactions
  const uploadArea = document.getElementById('upload-area');
  const fileInput = document.getElementById('file-input');
  const uploadButton = document.querySelector('.upload-button');
  
  // Open file dialog when upload area or button is clicked
  uploadArea.addEventListener('click', function() {
    fileInput.click();
  });
  
  uploadButton.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent click from bubbling to the upload area
    fileInput.click();
  });
  
  // Handle drag and drop
  uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadArea.classList.add('upload-area-active');
  });
  
  uploadArea.addEventListener('dragleave', function() {
    uploadArea.classList.remove('upload-area-active');
  });
  
  uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadArea.classList.remove('upload-area-active');
    
    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      // Handle files (in a real implementation, you would process the files here)
      alert('Files received: ' + e.dataTransfer.files.length);
    }
  });
  
  // Handle file selection
  fileInput.addEventListener('change', function() {
    if (fileInput.files.length) {
      // Handle files (in a real implementation, you would process the files here)
      alert('Files selected: ' + fileInput.files.length);
    }
  });
});
