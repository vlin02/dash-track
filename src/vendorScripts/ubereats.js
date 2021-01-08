const vendor = new Vendor("ubereats")

new MutationObserver(() => {
  const schema = $('script[type="application/ld+json"]:contains(@context)')
  const favWrapper = $(".favorite-wrapper")
  const injectDiv = $("#main-content")

  if (schema.length !== 0 && favWrapper.length == 0 && injectDiv.length) {
    const context = JSON.parse(schema.html())

    if ($("title").text().match(/ | Menu & Prices | Uber Eats$/)) {
      const img_src = context["image"][2].replace("\\u002F", "/")
      renderPageFavorite(
        new Restaurant(context["name"],  context["@id"], img_src, vendor)
      ).then((favButton) => {
        injectDiv.append([favButton])
      })
    }
  } else if (favWrapper.length > 1) {
    favWrapper.first().remove()
  }
}).observe(document.body, { childList: true, subtree: true })

new MutationObserver(() =>
  $(
    'button[title="Save as favorite"], button[title="Remove from favorites"]'
  ).remove()
).observe(document.body, { childList: true, subtree: true })
