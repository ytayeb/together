let moneyElements = [];

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