$("body").append(
  $("<script/>", {
    id: "jq",
    src: "https://code.jquery.com/jquery-3.3.1.min.js",
  })
)

const injectFavoriteButton = new MutationObserver(() => {
  const schema = $('script[type="application/ld+json"]:contains(@context)')
  const uberFavorite = $('button[title="Save as favorite"]')

  if (schema.length && uberFavorite) {
    const context = JSON.parse(schema.html())
    const url = context["@id"]

    if (url && url.match(/^https:\/\/www.ubereats.com\/.*\/food-delivery\/.*/)) {
      renderFavoriteButton(
        "ubereats",
        {
          id: context["@id"],
          name: context["name"],
        }, ["float-right ml-3" , "btn btn-outline-light", "btn btn-danger"]
      ).then((favButton) => 
        uberFavorite.replaceWith(favButton)
      )
    }
  }
})

injectFavoriteButton.observe(document.body, { childList: true, subtree: true })
