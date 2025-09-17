document.addEventListener('DOMContentLoaded', () => {
    const base = "https://dcargygmim.github.io/daymeians-flame-laucnher/";
    let loggedIn = false;
    const content = document.getElementById('content');
    setBackground();
    setInterval(setBackground, 30000);

    // Show login form first
    content.innerHTML = getLoginContent();

    // Only allow navigation after login
    document.addEventListener('click', (event) => {
        const { id } = event.target;
        if (!loggedIn) {
            if (id === 'loginBtn') {
                handleLogin();
            } else if (id === 'dashboard' || id === 'serverList' || id === 'support' || id === 'developers' || id === 'about' || id === 'launch' || id === 'addServer') {
                event.preventDefault();
                alert('You must log in first!');
            }
            return;
        }
        if (id === 'dashboard') {
            content.innerHTML = getDashboardContent();
        } else if (id === 'serverList') {
            content.innerHTML = getServerListContent();
        } else if (id === 'support') {
            content.innerHTML = getSupportContent();
        } else if (id === 'developers') {
            content.innerHTML = getDevelopersContent();
        } else if (id === 'about') {
            content.innerHTML = getAboutContent();
        } else if (id === 'launch') {
            handleLaunch();
        } else if (id === 'addServer') {
            handleAddServer();
        }
    });

    document.addEventListener('change', (event) => {
        if (!loggedIn) return;
        if (event.target.id === 'version') {
            console.log(`Version selected: ${event.target.value}`);
        }
    });

    function handleLogin() {
        const username = document.getElementById('daymeiandev').value.trim();
        const password = document.getElementById('Youtube2008!').value;
        if (username && password) {
            if (username === 'daymeiandev' && password === 'Youtube2008!') {
                loggedIn = true;
                alert('Login successful!');
                content.innerHTML = getDashboardContent();
            } else {
                alert('Invalid credentials. Please try again.');
            }
        } else {
            alert('Please enter both username and password.');
        }
    }
});

// Show loading spinner
function showLoadingSpinner() {
    const content = document.getElementById('content');
    content.innerHTML = '<div class="loader">Loading...</div>';
}

// Handle Launch button click
function handleLaunch() {
    const selectedVersion = document.getElementById('version').value;
    if (selectedVersion) {
        window.open(selectedVersion, '_blank'); // Opens the selected version in a new tab
    } else {
        alert('Please select a version before launching.');
    }
}

// Handle Add Server button click
function handleAddServer() {
    const serverUrl = prompt('Enter the server URL:');
    if (serverUrl && validateUrl(serverUrl)) {
        const serverList = document.querySelector('ul');
        const newServerItem = document.createElement('li');
        newServerItem.textContent = `Server: ${serverUrl}`;
        serverList.appendChild(newServerItem);
    } else {
        alert('Invalid server URL. Please enter a valid URL.');
    }
}

// Validate URL format
function validateUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

// Handle Login button click
function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (username && password) {
        if (username === 'admin' && password === 'password') {
            alert('Login successful!');
            document.getElementById('content').innerHTML = getDashboardContent();
        } else {
            alert('Invalid credentials. Please try again.');
        }
    } else {
        alert('Please enter both username and password.');
    }
}

// Function to get dashboard content
function getDashboardContent() {
    return `
        <h2>Dashboard</h2>
        <div class="version-selector">
            <label for="version">Select Version:</label>
            <select id="version">
                    <option value="${base}versions/1.8.8/index.html">1.8.8</option>
                    <option value="${base}versions/1.7.3/index.html">1.7.3</option>
                    <option value="${base}versions/1.5.2/index.html">1.5.2</option>
                <option value="versions/1.3/index.html">1.3</option>
                <option value="versions/1.2.6/index.html">1.2.6</option>
                <option value="versions/ResentClient/index.html">ResentClient</option>
                <option value="versions/ShadowClient/index.html">ShadowClient</option>
                <option value="versions/EaglerForge/index.html">EaglerForge</option>
                <option value="versions/FlameClient/index.html">FlameClient</option>
            </select>
        </div>
        <button id="launch">Launch</button>
        <div id="server-list-container">
            <!-- Server list content will be dynamically added here -->
        </div>
    `;
}

// Function to get server list content
function getServerListContent() {
    return `
        <h2>Server List</h2>
        <div id="external" class="tab-content">
            <h1>External Servers</h1>
            <div class="server-list minecraft-scrollbar">
                <div class="server-entry">
                    <div class="server-details">
                        <span class="server-name">ArchMC</span>
                        <span class="server-address">wss://mc.arch.lol</span>
                    </div>
                    <button class="copy-button" data-address="wss://mc.arch.lol">Copy</button>
                        <button class="play-button" onclick="location.href='${base}versions/1.8.8/index.html?server=wss://mc.arch.lol'">Play</button>
                </div>
                <div class="server-entry">
                    <div class="server-details">
                        <span class="server-name">Asianf4rmer</span>
                        <span class="server-address">wss://asianf4rmer.minecraft.pe</span>
                    </div>
                    <button class="copy-button" data-address="wss://asianf4rmer.minecraft.pe">Copy</button>
                        <button class="play-button" onclick="location.href='${base}versions/1.8.8/index.html?server=wss://asianf4rmer.minecraft.pe'">Play</button>
                </div>
                <!-- Add other server entries similarly -->
                <div class="server-entry">
                    <div class="server-details">
                        <span class="server-name">ZythMC</span>
                        <span class="server-address">wss://mc.zyth.me</span>
                    </div>
                    <button class="copy-button" data-address="wss://mc.zyth.me">Copy</button>
                        <button class="play-button" onclick="location.href='${base}versions/1.8.8/index.html?server=wss://mc.zyth.me'">Play</button>
                </div>
            </div>
        </div>
    `;
}

// Add event listener for copy buttons
document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const address = button.getAttribute('data-address');
            navigator.clipboard.writeText(address)
                .then(() => {
                    alert('Server address copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy address: ', err);
                });
        });
    });
});

// Function to get support content
function getSupportContent() {
    return `
        <h2>Support</h2>
        <p>If you encounter any issues or need help, you can reach out to us through the following channels:</p>
        <ul>
            <li>Email: support@eaglercraft.com</li>
            <li>Discord: <a href="https://discord.gg/eaglercraft" target="_blank">Join our Discord</a></li>
            <li>Forums: <a href="https://forums.eaglercraft.com" target="_blank">Eaglercraft Forums</a></li>
        </ul>
    `;
}

// Function to get developers content
function getDevelopersContent() {
    return `
        <h2>Created By</h2>
        <div class="createdby-info">
            <img src="https://dcargygmim.github.io/daymeians-flame-laucnher/images/flqmze-icon.png" alt="FLQMZECLIENT" class="createdby-icon">
            <p class="createdby-name">FLQMZECLIENT</p>
            <p class="createdby-role">Lead Creator</p>
        </div>
        <div class="createdby-info">
            <img src="https://dcargygmim.github.io/daymeians-flame-laucnher/images/ar-dev-icon.png" alt="AR-dev" class="createdby-icon">
            <p class="createdby-name">AR-dev</p>
            <p class="createdby-role">Co-Creator</p>
        </div>
    `;
}

// Function to get about content
function getAboutContent() {
    return `
        <h2>About</h2>
        <p>The Flame Launcher is a custom launcher for Eaglercraft, developed by FLQMZECLIENT and AR-dev.</p>
        <p>Version: 1.0</p>
        <p>This launcher provides a seamless experience for managing and launching different versions of Minecraft. Stay tuned for updates and new features!</p>
    `;
}

// Function to get login content
function getLoginContent() {
    return `
        <h2>Login</h2>
        <form id="loginForm">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <br>
            <button type="button" id="loginBtn">Login</button>
        </form>
    `;
}

// Function to set background
function setBackground() {
    const backgrounds = [
    'url("https://dcargygmim.github.io/daymeians-flame-laucnher/images/background1.jpg")',
    'url("https://dcargygmim.github.io/daymeians-flame-laucnher/images/background2.jpg")',
    'url("https://dcargygmim.github.io/daymeians-flame-laucnher/images/background3.jpg")',
    'url("https://dcargygmim.github.io/daymeians-flame-laucnher/images/background4.jpg")',
    'url("https://dcargygmim.github.io/daymeians-flame-laucnher/images/background5.jpg")',
    ];
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = backgrounds[randomIndex];
}
