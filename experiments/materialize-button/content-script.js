$("head").append(
  $.parseHTML(
    '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'
  )
)

let canInject = true

const injectFavoriteButton = new MutationObserver(() => {
  const schema = $('script[type="application/ld+json"]:contains(@context)')

  if (schema.length !== 0 && canInject) {
    const context = JSON.parse(schema.html())
    const url = context["@id"]

    if (url && url.match(/^https:\/\/www.doordash.com\/store\/.*/)) {
      canInject = false
      renderFavoriteButton("doordash", {
        id: context["@id"],
        name: context["name"]
      }).then((favButton) => {
        $("body > #root > div").append(favButton)
      })
    } else if (!canInject) {
      $(".favorite-wrapper").remove()
      canInject = true
    }
  }
})

injectFavoriteButton.observe(document.body, { childList: true, subtree: true })
