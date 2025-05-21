let questions = [];
let currentQuestionIndex = 0;
let totalScore = 0;
let moneyElements = [];
let selectedOptionInCurrentQuestion = false;
let endScreenFile = '';

// Create falling money effect
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
        moneyElements.push(money);
    }
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function showSpeechBubble(text, duration = 2000) {
    const speechBubble = document.getElementById('speech-bubble');
    if (speechBubble) {  // Check if element exists
        speechBubble.textContent = text;
        speechBubble.classList.add('show');
        
        setTimeout(() => {
            speechBubble.classList.remove('show');
        }, duration);
    }
}

// Redirect to end screen with the score
function redirectToEndScreen() {
    // Construct the URL with the score
    let endUrl = `end.html?score=${totalScore}`;
    
    // Add the end screen file parameter if it exists
    if (endScreenFile) {
        endUrl += `&endScreens=${endScreenFile}`;
    }
    
    // Redirect to the end page
    window.location.href = endUrl;
}

// Initialize game
function initGame() {
    // Get the question file name from the URL or use the default
    const questionFile = getQueryParam('file') || 'data/qKituv.json';
    endScreenFile = getQueryParam('endScreens') || 'data/end_screens.json';
    
    // Load questions
    fetch(questionFile)
        .then(response => response.json())
        .then(questionsData => {
            questions = questionsData;
            showQuestion();
        })
        .catch(error => {
            console.error('Error loading data:', error);
            document.getElementById('question-text').innerText = 'Error loading game data. Please try again.';
        });
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        // Instead of showing end screen here, redirect to end.html
        redirectToEndScreen();
        return;
    }

    let question = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = question.question;
    
    // Reset the selected option flag for the new question
    selectedOptionInCurrentQuestion = false;
    
    // Set background image if provided in the question
    if (question.background_image) {
        document.getElementById('background-image').style.backgroundImage = `url('${question.background_image}')`;
    }
    
    // Set host image if provided in the question
    if (question.host_image) {
        document.getElementById('host-image').src = question.host_image;
        document.getElementById('host-image').style.visibility = "visible";
        document.getElementById('mobile-host-image').style.visibility = "visible";
    } else {
        document.getElementById('host-image').style.visibility = "hidden";
        document.getElementById('mobile-host-image').style.visibility = "hidden";
    }

    
    let options = [
        { letter: 'A', text: question.option1, score: question.score1 || 0 },
        { letter: 'B', text: question.option2, score: question.score2 || 0 },
        { letter: 'C', text: question.option3, score: question.score3 || 0 },
        { letter: 'D', text: question.option4, score: question.score4 || 0 }
    ];
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option-item');
        optionElement.innerHTML = `
            <span class="option-text">${option.text}</span>
        `;
        optionElement.onclick = () => selectAnswer(optionElement, option.score, option.text);
        optionsContainer.appendChild(optionElement);
    });
}

function selectAnswer(element, score, optionText) {
    // Only allow selecting an option once per question
    if (selectedOptionInCurrentQuestion) return;
    selectedOptionInCurrentQuestion = true;
    
    const allOptions = document.querySelectorAll('.option-item');
    
    // Disable all options
    allOptions.forEach(option => {
        option.style.pointerEvents = 'none';
    });

    // Add selected class to the chosen option
    element.classList.add('selected-option');
    
    // Log the selected option's score before adding to total
    console.log(`Selected option: "${optionText}" with score: ${score}`);

    // Add the score
    totalScore += score;

    // Log the updated total score
    console.log(`New total score: ${totalScore}`);
    
    // Show message with custom or default text
    const question = questions[currentQuestionIndex];
    let message = '';
    
    if (question.custom_message) {
        message = question.custom_message;
    } else {
        message = `You selected "${optionText}"! +${score} points!`;
    }
    
    // Try to show speech bubble, but don't depend on it
    showSpeechBubble(message);
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 2000);
}

// Start the game
window.onload = initGame;
