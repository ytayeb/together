// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Create falling money effect if needed
function createFallingMoney() {
    const moneyEffect = document.getElementById('money-effect');
    
    for (let i = 0; i < 20; i++) {
        const money = document.createElement('div');
        money.classList.add('falling-money');
        
        // Random position, speed and delay
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 15;
        
        money.style.left = `${left}%`;
        money.style.animationDuration = `${duration}s`;
        money.style.animationDelay = `${delay}s`;
        
        moneyEffect.appendChild(money);
    }
}

// Function to load end screen data
function loadEndScreen() {
    // Get parameters from URL
    const score = parseInt(getQueryParam('score') || '0');
    const endScreenFile = getQueryParam('endScreens') || 'data/end_screens.json';
    
    // Load end screens
    fetch(endScreenFile)
        .then(response => response.json())
        .then(endScreensData => {
            // Display the appropriate end screen
            displayEndScreen(endScreensData, score);
        })
        .catch(error => {
            console.error('Error loading end screen data:', error);
            // Display fallback message
            document.getElementById('result-title').innerText = 'Game Complete!';
            document.getElementById('result-message').innerText = `Final score: ${score} points!`;
            document.getElementById('result-recommendation').innerText = ''; 
        });
    
    // Set up the play again button
    document.getElementById('play-again-btn').addEventListener('click', () => {
        // Redirect back to the main game page
        window.location.href = 'index.html';
    });
}

function displayEndScreen(endScreens, score) {
    if (Array.isArray(endScreens)) {
        // Sort end screens by minimum score in descending order
        const sortedEndScreens = [...endScreens].sort((a, b) => 
            (b.min_score || 0) - (a.min_score || 0)
        );
        
        // Debug output to help diagnose the issue
        console.log("Player score:", score);
        console.log("Sorted end screens:", sortedEndScreens);
        
        // Find the first end screen where the score is >= min_score
        let matchFound = false;
        for (const endScreen of sortedEndScreens) {
            const minScore = endScreen.min_score || 0;
            console.log(`Checking if ${score} >= ${minScore}`);
            
            if (score >= minScore) {
                console.log("Match found:", endScreen.title);
                
                // Set title and message
                document.getElementById('result-title').innerText = endScreen.title || `Final Score: ${score}`;
                document.getElementById('result-message').innerText = endScreen.message || `You earned ${score} points!`;
                
                // Set recommendation if available
                rec_title = "<span id='rec_title'>המלצה:</span>";
                if (endScreen.recommendation) {
                    document.getElementById('result-recommendation').innerHTML = rec_title + endScreen.recommendation;
                } else {
                    document.getElementById('result-recommendation').innerHTML = '';
                }

                // Set background if specified
                if (endScreen.background_image) {
                    document.getElementById('background-image').style.backgroundImage = `url('${endScreen.background_image}')`;
                }
                
                // Set host image if specified
                if (endScreen.host_image) {
                    document.getElementById('host-image').src = endScreen.host_image;
                    document.getElementById('mobile-host-image').src = endScreen.host_image;
                    
                    document.getElementById('host-container').style.display = 'block';
                    document.getElementById('mobile-host-container').style.display = 'block';
                } else {
                    document.getElementById('host-container').style.display = 'none';
                    document.getElementById('mobile-host-container').style.display = 'none';
                }
                
                // Enable money effect if specified
                if (endScreen.show_money_effect) {
                    createFallingMoney();
                }
                
                matchFound = true;
                break; // Exit the loop once we found a match
            }
        }
        
        if (!matchFound) {
            // Default end screen if no matching end screen was found
            console.log("No matching end screen found");
            document.getElementById('result-title').innerText = `Final Score: ${score}`;
            document.getElementById('result-message').innerText = `You earned a total of ${score} points!`;
        }
    } else {
        // Handle case where endScreens is not an array
        console.error("End screens data is not an array");
        document.getElementById('result-title').innerText = `Final Score: ${score}`;
        document.getElementById('result-message').innerText = `You earned a total of ${score} points!`;
        document.getElementById('result-recommendation').innerHTML = ''; // Clear recommendation if data is invalid
    }
}

// Initialize when the page loads
window.onload = loadEndScreen;