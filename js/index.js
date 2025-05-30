let moneyElements = [];
let isFemale = false; // Track current gender selection

// Text content for different genders
const textContent = {
    male: {
        title1: "בחן את עצמך",
        title2: "עד כמה אני מקדם שיח",
        title3: "מכבד ומאחד?"
    },
    female: {
        title1: "בחני את עצמך",
        title2: "עד כמה אני מקדמת שיח", 
        title3: "מכבד ומאחד?"
    }
};

// Gender toggle functionality
document.getElementById('gender-toggle').addEventListener('click', function() {
    isFemale = !isFemale;
    updateGenderToggle();
    updateTextContent();
});

function updateGenderToggle() {
    const toggle = document.getElementById('gender-toggle');
    const maleLabel = document.getElementById('male-label');
    const femaleLabel = document.getElementById('female-label');
    
    if (isFemale) {
        toggle.classList.add('active');
        maleLabel.classList.remove('active');
        femaleLabel.classList.add('active');
    } else {
        toggle.classList.remove('active');
        maleLabel.classList.add('active');
        femaleLabel.classList.remove('active');
    }
}

function updateTextContent() {
    const content = isFemale ? textContent.female : textContent.male;
    
    document.getElementById('title-1').textContent = content.title1;
    document.getElementById('title-2').textContent = content.title2;
    document.getElementById('title-3').textContent = content.title3;
}

// Start game button click handler
document.getElementById('start-button').addEventListener('click', function() {
    // Get the current query parameters to preserve them
    const urlParams = new URLSearchParams(window.location.search);
    const fileParam = urlParams.get('file') ? `file=${urlParams.get('file')}` : '';
    const endScreensParam = urlParams.get('endScreens') ? `endScreens=${urlParams.get('endScreens')}` : '';
    
    // Store gender in sessionStorage
    sessionStorage.setItem('gender', isFemale ? 'female' : 'male');

    // Construct the query string (without gender parameter)
    let queryString = '';
    const params = [fileParam, endScreensParam].filter(param => param);
    if (params.length > 0) {
        queryString = '?' + params.join('&');
    }
    
    // Navigate to the game page with the same parameters
    window.location.href = 'game.html' + queryString;
});


// Initialize welcome page
window.onload = function() {
    // Initialize with default (male) content
    updateGenderToggle();
    updateTextContent();
    // createFallingMoney();
};