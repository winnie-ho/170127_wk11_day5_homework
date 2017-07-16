var showParkRun = function() {
    var parkRunDiv = document.getElementById('park-run');

    if (parkRunDiv.style.display === 'none') {
        parkRunDiv.style.display = 'flex';
    } else {
        parkRunDiv.style.display = 'none';
    }
}