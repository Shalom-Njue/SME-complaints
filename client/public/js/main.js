// ============================================
// CONFIGURATION
// ============================================
const API_URL = 'http://localhost:5000/api';

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Creates and displays a toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of toast (success, error, info, warning)
 * @param {string} title - Optional title for the toast
 * @param {number} duration - Duration in milliseconds (default: 4000)
 */
function showToast(message, type = 'info', title = '', duration = 4000) {
    // Create toast container if it doesn't exist
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Icon based on type
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };
    
    // Default titles
    const defaultTitles = {
        success: 'Success',
        error: 'Error',
        info: 'Info',
        warning: 'Warning'
    };
    
    const toastTitle = title || defaultTitles[type];
    
    toast.innerHTML = `
        <div class="toast-icon">${icons[type]}</div>
        <div class="toast-content">
            <div class="toast-title">${toastTitle}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }, duration);
}

/**
 * Displays an error message to the user
 * @param {string} message - The error message to display
 * @param {string} elementId - The ID of the element to display the error in
 */
function showError(message, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="alert alert-error">${message}</div>`;
        setTimeout(() => {
            element.innerHTML = '';
        }, 5000);
    }
}

/**
 * Displays a success message to the user
 * @param {string} message - The success message to display
 * @param {string} elementId - The ID of the element to display the message in
 */
function showSuccess(message, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="alert alert-success">${message}</div>`;
    }
}

/**
 * Shows a loading indicator
 * @param {string} elementId - The ID of the element to show loading in
 */
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="loading-indicator">Loading...</div>';
    }
}

/**
 * Hides the loading indicator
 * @param {string} elementId - The ID of the element to hide loading from
 */
function hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '';
    }
}

/**
 * Validates complaint form data
 * @param {Object} data - The form data to validate
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validateComplaintForm(data) {
    const errors = [];
    
    // Name validation
    if (!data.customerName || data.customerName.trim().length < 2) {
        errors.push('Name must be at least 2 characters');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation (Kenyan format)
    const phoneRegex = /^(\+254|0)[17]\d{8}$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
        errors.push('Please enter a valid Kenyan phone number (e.g., 0712345678 or +254712345678)');
    }
    
    // Category validation
    if (!data.category) {
        errors.push('Please select a complaint category');
    }
    
    // Description validation
    if (!data.description || data.description.trim().length < 10) {
        errors.push('Description must be at least 10 characters');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// ============================================
// CUSTOMER PORTAL FUNCTIONS
// ============================================

/**
 * Handles tab switching in customer portal
 * @param {string} tab - The tab to display ('submit' or 'track')
 * @param {Event} event - The click event object
 */
function showTab(tab, event) {
    document.getElementById('submit-section').style.display = tab === 'submit' ? 'block' : 'none';
    document.getElementById('track-section').style.display = tab === 'track' ? 'block' : 'none';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

/**
 * Handles complaint form submission
 * Validates form data and submits to the API
 */
if(document.getElementById('complaintForm')) {
    document.getElementById('complaintForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const data = {
            customerName: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            category: document.getElementById('category').value,
            description: document.getElementById('description').value
        };

        // Validate form data
        const validation = validateComplaintForm(data);
        if (!validation.valid) {
            showError(validation.errors.join('<br>'), 'submissionMessage');
            return;
        }

        try {
            showLoading('submissionMessage');
            
            const res = await fetch(`${API_URL}/complaints`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const result = await res.json();
            
            hideLoading('submissionMessage');
            
            if(result.success) {
                showSuccess(
                    `Success! Your Ticket ID is: <strong>${result.id}</strong>. Save this to track status.`,
                    'submissionMessage'
                );
                showToast(`Your complaint has been submitted. Ticket ID: ${result.id}`, 'success', 'Complaint Submitted', 6000);
                document.getElementById('complaintForm').reset();
            } else {
                showError('Error submitting complaint. Please try again.', 'submissionMessage');
                showToast('Failed to submit complaint. Please try again.', 'error', 'Submission Failed');
            }
        } catch (error) {
            hideLoading('submissionMessage');
            showError('Unable to connect to the server. Please check your internet connection and try again.', 'submissionMessage');
            showToast('Unable to connect to the server. Please check your internet connection.', 'error', 'Connection Error');
            console.error('Error submitting complaint:', error);
        }
    });
}

/**
 * Tracks a complaint by ID
 * Fetches complaint details from the API and displays status
 */
async function trackComplaint() {
    const id = document.getElementById('trackId').value.trim();
    if(!id) {
        showError('Please enter a Ticket ID', 'trackResult');
        return;
    }

    try {
        showLoading('trackResult');
        
        const res = await fetch(`${API_URL}/complaints/${id}`);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const result = await res.json();
        const div = document.getElementById('trackResult');

        hideLoading('trackResult');

        if(result.success) {
            const c = result.data;
            const unreadCount = c.unreadCount?.customer || 0;
            const unreadBadge = unreadCount > 0 ? `<span class="unread-badge">${unreadCount > 99 ? '99+' : unreadCount}</span>` : '';
            
            div.innerHTML = `
                <div class="card" style="margin-top: 20px;">
                    <div class="card-header" style="background: var(--primary-color); color: white;">
                        <h3 style="margin: 0;">Complaint Details</h3>
                    </div>
                    <div class="card-body">
                        <div style="display: grid; gap: 15px;">
                            <div>
                                <strong style="color: var(--text-light);">Status:</strong><br>
                                <span class="status-${c.status.split(' ')[0]}" style="font-size: 16px; margin-top: 5px;">${c.status}</span>
                            </div>
                            <div>
                                <strong style="color: var(--text-light);">Category:</strong><br>
                                <span style="color: var(--text-color);">${c.category}</span>
                            </div>
                            <div>
                                <strong style="color: var(--text-light);">Your Issue:</strong><br>
                                <p style="margin: 5px 0 0 0; color: var(--text-color); line-height: 1.6;">${c.description}</p>
                            </div>
                            <div>
                                <strong style="color: var(--text-light);">Admin Response:</strong><br>
                                <p style="margin: 5px 0 0 0; color: var(--text-color); line-height: 1.6;">${c.adminResponse || 'No response yet. We will get back to you soon.'}</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button onclick="openChat('${c.complaintId}', 'Customer')" class="btn btn-primary" style="position: relative;">
                            💬 Chat with Support
                            ${unreadBadge}
                        </button>
                    </div>
                </div>
            `;
            
            // Store unread count for this complaint
            currentUnreadCount = c.unreadCount || { customer: 0, admin: 0 };
            
        } else {
            div.innerHTML = '<div class="alert alert-error" style="margin-top: 20px;">Complaint ID not found. Please check your ticket ID and try again.</div>';
            showToast('Complaint ID not found. Please check your ticket ID.', 'error', 'Not Found');
        }
    } catch (error) {
        hideLoading('trackResult');
        showError('Unable to connect to the server. Please check your internet connection and try again.', 'trackResult');
        showToast('Unable to connect to the server. Please check your internet connection.', 'error', 'Connection Error');
        console.error('Error tracking complaint:', error);
    }
}

// ============================================
// ADMIN DASHBOARD FUNCTIONS
// ============================================

let currentComplaints = [];
let currentEditId = null;

/**
 * Loads all complaints from the API
 * Populates the admin table with complaint data
 */
async function loadComplaints() {
    try {
        const res = await fetch(`${API_URL}/admin/complaints`);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const result = await res.json();
        if(result.success) {
            currentComplaints = result.data;
            renderTable(currentComplaints);
        }
    } catch (error) {
        console.error('Error loading complaints:', error);
        showToast('Unable to load complaints. Please check your connection and try again.', 'error', 'Connection Error');
    }
}

/**
 * Renders the complaints table with provided data
 * @param {Array} data - Array of complaint objects to display
 */
function renderTable(data) {
    const tbody = document.getElementById('complaintTableBody');
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 30px; color: var(--text-light);">No complaints found</td></tr>';
        return;
    }
    
    data.forEach(c => {
        const unreadCount = c.unreadCount?.admin || 0;
        const unreadBadge = unreadCount > 0 ? `<span class="unread-badge">${unreadCount > 99 ? '99+' : unreadCount}</span>` : '';
        
        const row = `
            <tr>
                <td><strong>${c.complaintId}</strong></td>
                <td>${new Date(c.createdAt).toLocaleDateString()}</td>
                <td>
                    <div>${c.customerName}</div>
                    <small style="color: var(--text-light);">${c.phone}</small>
                </td>
                <td>${c.category}</td>
                <td><span class="status-${c.status.split(' ')[0]}">${c.status}</span></td>
                <td>
                    <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                        <button onclick="openResolveModal('${c.complaintId}')" class="btn btn-secondary" style="font-size:12px; padding:5px 10px;">✏️ Edit</button>
                        <button onclick="openChat('${c.complaintId}', 'Admin')" class="btn btn-primary" style="font-size:12px; padding:5px 10px; position: relative;">
                            💬 Chat
                            ${unreadBadge}
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

/**
 * Filters complaints based on search term
 * Searches by complaint ID and customer name
 */
function filterComplaints() {
    const term = document.getElementById('adminSearch').value.toLowerCase();
    const filtered = currentComplaints.filter(c => 
        c.complaintId.toLowerCase().includes(term) || 
        c.customerName.toLowerCase().includes(term)
    );
    renderTable(filtered);
}

/**
 * Opens the resolve modal for a specific complaint
 * @param {string} id - The complaint ID to edit
 */
function openResolveModal(id) {
    const complaint = currentComplaints.find(c => c.complaintId === id);
    if(!complaint) return;

    currentEditId = id;
    document.getElementById('modalId').innerText = id;
    document.getElementById('modalDesc').innerText = complaint.description;
    document.getElementById('updateStatus').value = complaint.status;
    document.getElementById('adminResponse').value = complaint.adminResponse;
    document.getElementById('resolveModal').classList.add('active');
}

/**
 * Closes the resolve modal
 */
function closeModal() {
    document.getElementById('resolveModal').classList.remove('active');
}

/**
 * Submits the complaint update to the API
 * Updates status and admin response
 */
async function submitUpdate() {
    const status = document.getElementById('updateStatus').value;
    const response = document.getElementById('adminResponse').value;

    try {
        const res = await fetch(`${API_URL}/admin/complaints/${currentEditId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, adminResponse: response })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        if(result.success) {
            showToast('Complaint has been updated successfully', 'success', 'Update Successful');
            closeModal();
            loadComplaints(); // Refresh table
        } else {
            showToast('Error updating complaint. Please try again.', 'error', 'Update Failed');
        }
    } catch (error) {
        console.error('Error updating complaint:', error);
        showToast('Unable to update complaint. Please check your connection and try again.', 'error', 'Connection Error');
    }
}

// ============================================
// CHAT SYSTEM
// ============================================

let socket = io(); // Initialize Socket.io connection
let chatRoomId = null;
let currentUserType = null; // 'Customer' or 'Admin'
let currentUnreadCount = { customer: 0, admin: 0 }; // Track unread counts

/**
 * Opens the chat modal for a specific complaint
 * @param {string} complaintId - The complaint ticket ID
 * @param {string} userType - Either 'Customer' or 'Admin'
 */
async function openChat(complaintId, userType) {
    chatRoomId = complaintId;
    currentUserType = userType;
    
    document.getElementById('chatModal').style.display = 'flex';
    document.getElementById('chatTitle').innerText = `Chat - Ticket ${complaintId}`;
    
    try {
        // 1. Join the Socket Room
        socket.emit('joinRoom', { complaintId });
        
        // 2. Mark messages as read for this user
        socket.emit('markAsRead', { complaintId, userType });
        
        // 3. Load Old History from API
        const res = await fetch(`${API_URL}/complaints/${complaintId}/messages`);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        const chatBox = document.getElementById('chatMessages');
        chatBox.innerHTML = ''; // Clear previous
        
        if(data.success) {
            data.messages.forEach(msg => appendMessage(msg.sender, msg.text));
            // Update unread count from response
            if (data.unreadCount) {
                currentUnreadCount = data.unreadCount;
                updateUnreadBadges();
            }
        }
    } catch (error) {
        console.error('Error loading chat:', error);
        const chatBox = document.getElementById('chatMessages');
        chatBox.innerHTML = '<p style="color:red">Unable to load chat history. Please try again.</p>';
    }
}

/**
 * Sends a chat message
 * Emits the message to the server via Socket.io
 */
function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    
    if (text && chatRoomId) {
        // Emit to Server
        socket.emit('chatMessage', {
            complaintId: chatRoomId,
            sender: currentUserType,
            text: text
        });
        input.value = ''; // Clear input
    }
}

/**
 * Listens for incoming chat messages from Socket.io
 */
socket.on('message', (msg) => {
    appendMessage(msg.sender, msg.text);
    
    // Update unread count if provided
    if (msg.unreadCount) {
        currentUnreadCount = msg.unreadCount;
        updateUnreadBadges(chatRoomId);
    }
});

/**
 * Listens for unread count updates
 */
socket.on('unreadCountUpdated', (data) => {
    if (data.unreadCount) {
        currentUnreadCount = data.unreadCount;
        updateUnreadBadges(chatRoomId);
    }
});

/**
 * Appends a message to the chat display
 * @param {string} sender - The sender of the message ('Customer' or 'Admin')
 * @param {string} text - The message text
 */
function appendMessage(sender, text) {
    const chatBox = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.classList.add('message', sender);
    div.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
}

/**
 * Closes the chat modal
 */
function closeChat() {
    document.getElementById('chatModal').style.display = 'none';
}

/**
 * Updates unread message badges on chat buttons
 * @param {string} complaintId - Optional complaint ID to update specific button
 */
function updateUnreadBadges(complaintId = null) {
    // If we're on the tracking page (customer view)
    if (currentUserType === 'Customer' && complaintId) {
        const unreadCount = currentUnreadCount.customer || 0;
        
        // Find the chat button for this complaint
        const chatButton = document.querySelector(`[onclick*="openChat('${complaintId}', 'Customer')"]`);
        if (chatButton) {
            updateButtonBadge(chatButton, unreadCount);
        }
    }
    
    // If we're on the admin page
    if (currentUserType === 'Admin') {
        // Reload the complaints table to show updated badges
        if (typeof loadComplaints === 'function') {
            loadComplaints();
        }
    }
}

/**
 * Updates a single button's badge
 * @param {HTMLElement} button - The button element
 * @param {number} count - The unread count
 */
function updateButtonBadge(button, count) {
    // Remove existing badge
    const existingBadge = button.querySelector('.unread-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    // Add new badge if count > 0
    if (count > 0) {
        const badge = document.createElement('span');
        badge.className = 'unread-badge';
        badge.textContent = count > 99 ? '99+' : count;
        button.style.position = 'relative';
        button.appendChild(badge);
    }
}
