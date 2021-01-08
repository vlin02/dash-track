$("body").append(
  $("<script/>", {
    id: "jq",
    src: "https://code.jquery.com/jquery-3.3.1.min.js"
  })
)

const vendor = new Vendor("doordash")

new MutationObserver(() => {
  const schema = $('script[type="application/ld+json"]:contains(@context)')
  const favWrapper = $(".favorite-wrapper")
  const injectDiv = $("body > #root > div > div")

  if (schema.length !== 0 && favWrapper.length == 0 && injectDiv.length) {
    const context = JSON.parse(schema.html())

    if ($("title").text().match(" - Delivery Menu - ")) {
      const banner = $("img[srcset*='/media/store']")
      const img_src = banner.length === 0 ? context["image"] : banner[0].srcset.split(" ")[10]
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

