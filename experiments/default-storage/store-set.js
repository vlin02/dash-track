chrome.storage.sync.set({ key_with_set: new Set(["a", "b", "c"]) }, () =>
  chrome.storage.sync.get("key_with_set", console.log)
)

// can't store a set