let moneyElements = [];

// Create falling money effect
// function createFallingMoney() {
//     const moneyEffect = document.getElementById('money-effect');
    
//     for (let i = 0; i < 20; i++) {
//         const money = document.createElement('div');
//         money.classList.add('falling-money');
        
//         // Random position, speed and delay
//         const left = Math.random() * 100;
//         const duration = Math.random() * 10 + 5;
//         const delay = Math.random() * 15;
        
//         money.style.left = `${left}%`;
//         money.style.animationDuration = `${duration}s`;
//         money.style.animationDelay = `${delay}s`;
        
//         moneyEffect.appendChild(money);
//         moneyElements.push(money);
//     }
// }

// Start game button click handler
document.getElementById('start-button').addEventListener('click', function() {
    // Get the current query parameters to preserve them
    const urlParams = new URLSearchParams(window.location.search);
    const fileParam = urlParams.get('file') ? `file=${urlParams.get('file')}` : '';
    const endScreensParam = urlParams.get('endScreens') ? `endScreens=${urlParams.get('endScreens')}` : '';
    
    // Construct the query string
    let queryString = '';
    if (fileParam || endScreensParam) {
        queryString = '?';
        if (fileParam) queryString += fileParam;
        if (fileParam && endScreensParam) queryString += '&';
        if (endScreensParam) queryString += endScreensParam;
    }
    
    // Navigate to the game page with the same parameters
    // Replace 'game.html' with the actual filename of your game page
    window.location.href = 'game.html' + queryString;
});

// Initialize welcome page
window.onload = function() {
    // createFallingMoney();
};