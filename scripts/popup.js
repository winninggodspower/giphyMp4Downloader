
// Function to update popup content
function updatePopupContent(videoUrl, mediaUrl) {
    if (videoUrl && mediaUrl) {
        // remove loading animation
        document.getElementById('loader').style.display = 'none'

        // make content visible
        document.getElementById('content').style.display = 'block'

        document.querySelector('a').href = videoUrl || '';
        document.querySelector('img').src = changeToGif(mediaUrl) || '';
    }
}

(async ()=>{
    const response = await chrome.runtime.sendMessage({ type: 'getVideoUrls' });
    console.log(response);
    if (response) {
        updatePopupContent(response.videoUrl, response.mediaUrl)
    }
})()

function changeToGif(filename) {
    const parts = filename.split('.');
    parts[parts.length - 1] = 'gif';
    return parts.join('.');
}