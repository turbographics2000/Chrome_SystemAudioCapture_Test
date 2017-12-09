chrome.runtime.sendMessage({ ready: true });
chrome.runtime.onMessage.addListener(msg => {
    if (msg.streamId) {
        gUM(msg.streamId);
    }
});

function gUM(streamId) {
    navigator.mediaDevices.getUserMedia({
        audio: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: streamId
            }
        },
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: streamId
            }
        },
    }).then(stream => {
        stream.getVideoTracks().forEach(track => {
            stream.removeTrack(track);
        });
        vid.srcObject = stream;
    });
}