document.addEventListener("DOMContentLoaded", () => {
  const notifications = document.getElementById("notifications");
  const settingsButton = document.getElementById("settingsButton");
  const settingsPanel = document.getElementById("settingsPanel");
  const drinkIntervalInput = document.getElementById("drinkInterval");
  const eatIntervalInput = document.getElementById("eatInterval");
  const updateIntervalsButton = document.getElementById("updateIntervals");
  const clearAll = document.getElementById("clearAll");

  let drinkInterval = 60 * 1000; // Default: 60 minutes
  let eatInterval = 120 * 1000; // Default: 120 minutes

  // Request notification permission
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function addNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";

    const time = document.createElement("span");
    time.className = "time";
    time.textContent = `Assigned at: ${getCurrentTime()}`;

    const text = document.createElement("span");
    text.textContent = message;

    const thumb = document.createElement("span");
    thumb.className = "thumb";
    thumb.textContent = "👍"; // Thumbs-up emoji
    thumb.addEventListener("click", () => {
        notifications.removeChild(notification);
    });

    notification.appendChild(time);
    notification.appendChild(text);
    notification.appendChild(thumb);

    // Add notification to the DOM
    notifications.appendChild(notification);

    // Send mobile notification
    if (Notification.permission === "granted") {
        const mobileNotification = new Notification(message, {
            icon: 'https://example.com/icon.png', // Add a relevant icon
            vibrate: [200, 100, 200], // Vibration pattern for mobile devices
            badge: 'https://example.com/badge.png', // Badge for the app (optional)
        });

        mobileNotification.onclick = () => {
            window.focus(); // Focus the app when the notification is clicked
        };
    }
}


  // Toggle settings panel visibility
  settingsButton.addEventListener("click", () => {
    if (settingsPanel.style.display === "block") {
      settingsPanel.style.display = "none";
    } else {
      settingsPanel.style.display = "block";
    }
  });

  // Start reminders
  let drinkTimer = setInterval(() => addNotification("Time to drink some water! 💧"), drinkInterval);
  let eatTimer = setInterval(() => addNotification("Don't forget to eat something! 🍎"), eatInterval);
  
  clearAll.addEventListener("click", () => {
    if (settingsPanel.style.display === "block") {
      settingsPanel.style.display = "none";
    } else {
      settingsPanel.style.display = "block";
    }
    while (notifications.firstChild) {
      notifications.removeChild(notifications.firstChild);
    }
  })
  // Update intervals
  updateIntervalsButton.addEventListener("click", () => {
    if (settingsPanel.style.display === "block") {
      settingsPanel.style.display = "none";
    } else {
      settingsPanel.style.display = "block";
    }
    clearInterval(drinkTimer);
    clearInterval(eatTimer);

    const newDrinkInterval = parseInt(drinkIntervalInput.value) * 60 * 1000;
    const newEatInterval = parseInt(eatIntervalInput.value) * 60 * 1000;

    drinkInterval = newDrinkInterval;
    eatInterval = newEatInterval;
    
    drinkTimer = setInterval(() => addNotification("Time to drink some water! 💧"), drinkInterval);
    eatTimer = setInterval(() => addNotification("Don't forget to eat something! 🍎"), eatInterval);
  });
});
