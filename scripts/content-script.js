chrome.runtime.sendMessage({type: 'clearVideoUrls'})

window.onload = () => {
  let mediaElement; 
  
  if (location.pathname.startsWith('/stickers')) {
    mediaElement = document.querySelector("[data-tid='gif-detail__gif']").querySelector('img');
  } else {
    mediaElement = document.querySelector("video");
  }

  // split the video url to array using '/'
  const urlList = mediaElement.src.split("/"); 

  const mediaExtention = urlList[urlList.length - 1].split(".")[1];

  // generate download url
  const videoUrl = `https://i.giphy.com/${urlList[5]}.mp4`;

  console.log(videoUrl);

  //add the download button icon to the page
  addDownloadButton(mediaElement, videoUrl);

  // send the url to popup js
  chrome.runtime.sendMessage({
    type: 'setVideoUrls',
    videoUrl: videoUrl,
    mediaUrl: mediaElement.src
  });
};

function addDownloadButton(mediaElement, videoUrl){
  let parentElement = mediaElement.parentElement
  parentElement.style.position = "relative";
  
  // create download button
  let donwloadButton = document.createElement('a')
  donwloadButton.setAttribute('download', true)
  donwloadButton.href = videoUrl

  const imageUrl = chrome.runtime.getURL('assets/icon.png');
  donwloadButton.innerHTML = `<img style="border-radius: 100%" src="${imageUrl}" width="35px">`

  // style download button
  donwloadButton.style.position = 'absolute';
  donwloadButton.style.bottom = '10px';
  donwloadButton.style.right = '10px';
  donwloadButton.style.zIndex = 100;
  donwloadButton.target = '_blank'

  parentElement.appendChild(donwloadButton);
}
