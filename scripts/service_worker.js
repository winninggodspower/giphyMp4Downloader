let messageFromContent;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
  if (message.type == 'clearVideoUrls') {
    console.log('clearing video urls');
    chrome.storage.local.remove('messageFromContent')
  }
  
  else if (message.type == 'setVideoUrls') {
    console.log('setting video urls');
    messageFromContent = message;
    chrome.storage.local.set({messageFromContent: messageFromContent})
  }

  else if (message.type === "getVideoUrls") {
    chrome.storage.local.get(['messageFromContent'], (response)=>{
      console.log(response.messageFromContent);
      sendResponse(response.messageFromContent)
    })

    return true
  }
});

