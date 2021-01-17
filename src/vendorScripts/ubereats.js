$("body").append(
  $("<script/>", {
    id: "jq",
    src: "https://code.jquery.com/jquery-3.3.1.min.js"
  })
)

const vendor = new Vendor("ubereats")

new MutationObserver(() => {
  const schema = $('script[type="application/ld+json"]:contains(@context)')
  const favWrapper = $(".favorite-wrapper")
  const injectDiv = $("#main-content")

  if (schema.length && injectDiv.children().length > 1 && !favWrapper.length) {
    const context = JSON.parse(schema.html())

    if (
      $("title")
        .text()
        .match(/ | Menu & Prices | Uber Eats$/)
    ) {
      const img_src = context["image"][2].replace("\\u002F", "/")

      injectDiv.append(
        new pageFavoriteButton({
          name: context["name"],
          url: context["@id"],
          src: img_src,
          vendor: "ubereats"
        }).buttonWrapper
      )
    }
  } else if (favWrapper.length > 1) {
    favWrapper.first().remove()
  }
}).observe(document, { childList: true, subtree: true })

new MutationObserver(() =>
  $(
    'button[title="Save as favorite"], button[title="Remove from favorites"]'
  ).remove()
).observe(document, { childList: true, subtree: true })
