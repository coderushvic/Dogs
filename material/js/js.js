// Initialize balance to 0 - will be loaded from localStorage
let balance = 0;

// Load balance when page loads
function loadBalance() {
    // Always start with 0 if no balance exists
    const storedBalance = localStorage.getItem('balance');
    balance = storedBalance !== null ? parseInt(storedBalance) : 0;
    updateBalance();
}

// Update balance on the UI
function updateBalance() {
    const balanceElement = document.getElementById('balance');
    if (balanceElement) {
        balanceElement.textContent = balance;
    }
    // Save to localStorage whenever we update
    localStorage.setItem('balance', balance.toString());
}

// Show alert function
function showAlert(message) {
    alert(message);
}

// Handle ad button click and cooldown
function handleAdClick(button, rewardAmount = 10) {
    const lastAdTime = parseInt(localStorage.getItem('lastAdTime')) || 0;
    const currentTime = Date.now();
    const cooldown = 60 * 1000; // 60 seconds cooldown

    // Check cooldown
    if (currentTime - lastAdTime < cooldown) {
        const remainingTime = Math.ceil((cooldown - (currentTime - lastAdTime)) / 1000);
        showAlert(`Please wait ${remainingTime} seconds before watching the ad again.`);
        return;
    }

    // Update balance
    balance += rewardAmount;
    updateBalance(); // This will save to localStorage

    // Save the current time as last ad watch time
    localStorage.setItem('lastAdTime', currentTime.toString());

    // Disable button and start countdown
    if (button) {
        button.disabled = true;
        let countdown = 60;
        button.textContent = `Wait ${countdown}s`;

        const intervalId = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                button.textContent = `Wait ${countdown}s`;
            } else {
                clearInterval(intervalId);
                button.disabled = false;
                button.textContent = "🦴 Claim";
            }
        }, 1000);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadBalance(); // Will initialize balance to 0 for new users
    
    // Add click event to your ad button (make sure it exists)
    const adButton = document.getElementById('adButton'); // replace with your button's ID
    if (adButton) {
        adButton.addEventListener('click', function() {
            handleAdClick(this);
        });
    }
});
