class gridView {
  constructor() {
    this.e = $('<div/>', {class: 'row'})
  }

  get = () => this.e
  
  set = (rsnts, onUnfavorite) => {
    this.e.empty()

    if (rsnts.length > 0) {
      const storeCards = rsnts
        .map((rsnt) =>
          $("<div/>", {
            class: "col s12 m6 l4"
          }).append(new storeCard(rsnt, onUnfavorite).get())
        )
        
      this.e.append(storeCards)
    } else {
      this.e.append($("<div/>", { class: "row" }))
    }
  }
}
