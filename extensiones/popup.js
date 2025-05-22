document.getElementById('captureBtn').addEventListener('click', () => {
  chrome.tabs.captureVisibleTab(null, { format: 'png' }, (dataUrl) => {
    if (chrome.runtime.lastError) {
      console.error('Error al capturar:', chrome.runtime.lastError.message);
      alert('Error: ' + chrome.runtime.lastError.message);
    } else {
      // Podés hacer lo que quieras con dataUrl (es una imagen en base64)
      chrome.tabs.create({ url: dataUrl }); // Muestra la imagen capturada
    }
  });
});


// [ Extensión de Chrome ]
//         │
//         ▼
//   (envía imagen)
//         │
//         ▼
// [ Servidor Node.js seguro ]
//         │
//         ▼
//  (consulta GPT-4 con visión)
//         │
//         ▼
//   (responde análisis)
