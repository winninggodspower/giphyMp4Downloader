let messageFromContent;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
  if (message.type == 'clearVideoUrls') {
    console.log('clearing video urls');
    chrome.storage.session.remove('messageFromContent')
  }
  
  else if (message.type == 'setVideoUrls') {
    console.log('setting video urls');
    messageFromContent = message;
    chrome.storage.session.set({messageFromContent: messageFromContent})
  }

  else if (message.type === "getVideoUrls") {
    if (messageFromContent) {
      sendResponse(messageFromContent);
      return true
    }
    chrome.storage.session.get(['messageFromContent'], (response)=>{
      console.log(response.messageFromContent);
      sendResponse(response.messageFromContent)
    })

    return true
  }
});

