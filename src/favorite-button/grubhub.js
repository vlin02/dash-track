$("body").append(
  $("<script/>", {
    id: "jq",
    src: "https://code.jquery.com/jquery-3.3.1.min.js"
  })
)

const buttonAttrs = {
  add: {
    class: "float-right ml-3 btn btn-outline-light",
    style: "border-width: 2px; font-weight: 600"
  },
  remove: {
    class: "float-right ml-3 btn btn-danger"
  }
}

const injectFavoriteButton = new MutationObserver(() => {
  const schema = $('script[type="application/ld+json"]:contains(@context)')
  const grubFavorite = $(
    'button[title="Save this restaurant"], button[title="Saved restaurant"]'
  )
  const favButton = $("#favorite-button")

  if (schema.length && grubFavorite) {
    if (favButton.length === 0) {
      const context = JSON.parse(schema.html())
      const url = context["@id"]

      if (url && url.match(/^https:\/\/www.grubhub.com\/restaurant\/.*/)) {
        renderFavoriteButton(
          "grubhub",
          {
            id: context["@id"],
            name: context["name"]
          },
          buttonAttrs
        ).then((favButton) => grubFavorite.replaceWith(favButton))
      }
    } else {
        grubFavorite.remove()
    }
  }
})

injectFavoriteButton.observe(document.body, { childList: true, subtree: true })
