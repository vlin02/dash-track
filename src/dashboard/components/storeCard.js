const formatTime = (date) => {
  const s_month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ][date.getMonth()]

  return `${s_month} ${date.getDate()}, ${date.getFullYear()}`
}

class storeCard {
  constructor(rsnt, onUnfavorite) {
    this.rsnt = rsnt
    this.onUnfavorite = onUnfavorite

    this.e = $("<div/>", {
      class: "card hoverable",
      html: `
      <div class="card-image waves-effect waves-block waves-light">
        <a href="${rsnt.url}">
          <img class="center-cropped" src="${rsnt.src}">
        </a>
        <a class="fav-btn">
          <i class="material-icons" style="font-size: 27px;">favorite</i>
        </a>
      </div>
      <div class="card-content">
        <span class="card-title grey-text text-darken-4">
          <strong>${rsnt.name}</strong>
          <span class="right valign-wrapper grey-text text-darken-2" style="font-size:15px">
              ${
                rsnt.items.length
              }<i class="material-icons yellow-text text-darken-2">bookmark</i>
          </span>
        </span>
        <p>Added ${formatTime(new Date(rsnt.date_added))}</p>
      </div>
    </div>`
    })

    this.e
      .find(".fav-btn")
      .click(() =>
        new Vendor(this.rsnt.vendor.name)
          .removeRestaurant(this.rsnt)
          .then(() => this.onUnfavorite(this.rsnt))
          .catch(alert)
      )
  }

  get = () => this.e
}
