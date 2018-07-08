function saveOptions() {
    const teamId = document.getElementById('team-id').value;
    const accessToken = document.getElementById('access-token').value;

    chrome.storage.sync.set({
        teamId: teamId,
        accessToken: accessToken
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
        teamId: '',
        accessToken: ''
    }, function(items) {
        document.getElementById('team-id').value = items.teamId;
        document.getElementById('access-token').value = items.accessToken;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
