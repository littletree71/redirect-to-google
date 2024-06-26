chrome.webNavigation.onBeforeNavigate.addListener(details => {
  console.log(`URL about to navigate to: ${details.url}`);
  const url = new URL(details.url);
  if (url.hostname.includes("bing.com")) {
    const searchParams = url.searchParams.get("q");
    const googleUrl = searchParams ? 
      `https://www.google.com/search?q=${encodeURIComponent(searchParams)}` : 
      "https://www.google.com";

    console.log(`Redirecting to: ${googleUrl}`);
    chrome.tabs.create({ url: googleUrl }, () => {
      chrome.tabs.remove(details.tabId);
    });
  }
}, { url: [{ hostSuffix: "bing.com" }] });
