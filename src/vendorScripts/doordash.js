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
  const first_item_img = $('picture > img')

  if (schema.length && injectDiv.length && first_item_img.length && !favWrapper.length) {
    const context = JSON.parse(schema.html())

    if ($("title").text().match(" - Delivery Menu - ")) {
      const banner = $("img[srcset*='/media/store']")
      const item_imgs = first_item_img.attr('srcset').split(/ \d+w,? ?/)

      const img_src =
        banner.length !== 0 ? banner[0].srcset.split(" ")[10] : item_imgs[4]
  
      injectDiv.append(
        new pageFavoriteButton(
          new Restaurant(context["name"], context["@id"], img_src, vendor)
        ).buttonWrapper
      )
    }
  } else if (favWrapper.length > 1) {
    favWrapper.first().remove()
  }
}).observe(document.body, { childList: true, subtree: true })
