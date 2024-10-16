// simulate an asynchronous calculation
function calculateAsync(a, b, operation) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        switch (operation) {
          case 'add':
            resolve(a + b);
            break;
          case 'subtract':
            resolve(a - b);
            break;
          case 'multiply':
            resolve(a * b);
            break;
          case 'divide':
            if (b === 0) {
              reject(new Error('Cannot divide by zero'));
            } else {
              resolve(a / b);
            }
            break;
          default:
            reject(new Error('Unknown operation'));
        }
      }, 1000);  // Simulate a delay
    });
  }
  
  module.exports = { calculateAsync };