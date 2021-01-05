$("head").append(
  $.parseHTML(
    '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'
  )
)

const floatButton = $.parseHTML(`
<div class="fixed-action-btn direction-top" style="bottom: 45px; right: 24px;">
  <a class="not-fav-btn btn-floating btn-large">
    <i class="material-icons">favorite</i>
  </a>
  <ul>
    <li>
      <a class="fav-item btn-floating grey darken-3 tooltipped" data-position="left" data-tooltip="View favorited items">
      <i class="material-icons yellow-text darken-1">star</i>
      </a>
    </li>
  </ul>
</div>
`)

const injectFavoriteButton = new MutationObserver(() => {
  const schema = $('script[type="application/ld+json"]:contains(@context)')
  const favoriteButton = $("#favorite-button")

  if (schema.length && !favoriteButton.length) {
    const context = JSON.parse(schema.html())
    const url = context["@id"]

    if (url && url.match(/^https:\/\/www.doordash.com\/store\/.*/)) {
      renderFavoriteButton("doordash", {
        id: context["@id"],
        name: context["name"]
      }).then((favButton) => {
        $("body > #root").append(favButton)
        $(".fixed-action-btn").floatingActionButton()
        $(".tooltipped").tooltip()
      })
    }
  }
})

injectFavoriteButton.observe(document.body, { childList: true, subtree: true })
