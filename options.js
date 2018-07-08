function saveOptions() {
    const token = document.getElementById('token').value;
    chrome.storage.sync.set({
        token: token
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
          status.textContent = '';
        }, 750);
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        token: ''
    }, function(items) {
        document.getElementById('token').value = items.token;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
