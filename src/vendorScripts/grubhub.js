const vendor = new Vendor("grubhub")

new MutationObserver(() => {
  const schema = $('script[type="application/ld+json"]:contains(@context)')
  const favWrapper = $(".favorite-wrapper")
  const injectDiv = $("main")

  if (schema.length !== 0 && favWrapper.length == 0 && injectDiv.length) {
    const context = JSON.parse(schema.html())

    if (
      $("title")
        .text()
        .match(/ | Order Online With Grubhub$/)
    ) {
      injectDiv.append(
        new pageFavoriteButton({
          name: context["name"],
          url: context["@id"],
          src: context["image"],
          vendor: "grubhub"
        }).buttonWrapper
      )
    }
  } else if (favWrapper.length > 1) {
    favWrapper.first().remove()
  }
}).observe(document.body, { childList: true, subtree: true })

new MutationObserver(() =>
  $(
    'button[title="Save this restaurant"], button[title="Saved restaurant"]'
  ).remove()
).observe(document.body, { childList: true, subtree: true })
