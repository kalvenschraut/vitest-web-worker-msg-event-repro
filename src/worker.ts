console.log('woirker')
self.addEventListener('message', (event) => {
  self.postMessage(event.data);
})