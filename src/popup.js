/**
 * Popup Logic
 */

function formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} jour${days > 1 ? "s" : ""}`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

async function updateUI() {
    // 1. Update Time
    const result = await chrome.storage.local.get(["lastDistractionTime"]);
    const totalTimeEl = document.getElementById('total-time');
    
    if (result.lastDistractionTime) {
        const startTime = new Date(result.lastDistractionTime);
        const now = new Date();
        const diff = now - startTime;
        totalTimeEl.textContent = formatDuration(diff);
    } else {
        totalTimeEl.textContent = "0s";
    }

    // 2. Update Site List (From Background constants or Storage)
    // For now, we list from a fixed list to match background.js
    const sites = ["TikTok", "Twitter / X", "Instagram"];
    const listEl = document.getElementById('site-list');
    listEl.innerHTML = '';
    sites.forEach(site => {
        const li = document.createElement('li');
        li.className = 'site-item';
        li.innerHTML = `<span class="site-name">${site}</span><span style="color: #22c55e;">●</span>`;
        listEl.appendChild(li);
    });
}

// Auto update every second
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    setInterval(updateUI, 1000);
});
