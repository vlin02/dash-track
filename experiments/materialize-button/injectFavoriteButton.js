const injectFavoriteButton = (vendor, title_pattern, inject_query) => {
  new MutationObserver(() => {
    const schema = $('script[type="application/ld+json"]:contains(@context)')
    const favWrapper = $(".favorite-wrapper")
    const injectDiv = $(inject_query)

    if (schema.length !== 0 && favWrapper.length == 0 && injectDiv.length) {
      const context = JSON.parse(schema.html())

      if ($('title').text().match(title_pattern)) {
        renderFavoriteButton(vendor, {
          id: context["@id"],
          name: context["name"]
        }).then((favButton) => {
          injectDiv.append(favButton)
        })
      }
    } else if (favWrapper.length > 1) {
      favWrapper.first().remove()
    }
  }).observe(document.body, { childList: true, subtree: true })
}