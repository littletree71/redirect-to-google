chrome.webNavigation.onBeforeNavigate.addListener(details => {
    console.log(`URL about to navigate to: ${details.url}`);
    const url = new URL(details.url);
    if (url.hostname.includes("bing.com")) {
      const searchParams = url.searchParams.get("q");
      chrome.tabs.remove(details.tabId, () => {
        if (searchParams) {
          const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchParams)}`;
          console.log(`Redirecting to: ${googleUrl}`);
          chrome.tabs.create({ url: googleUrl });
        } else {
          chrome.tabs.create({ url: "https://www.google.com" });
        }
      });
    }
  }, { url: [{ hostSuffix: "bing.com" }] });
  