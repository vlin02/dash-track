const renderGridView = (v_name) => {
  const vendor = new Vendor(v_name)

  return vendor.fetchRestaurants().then((rsnts) => {
    if (rsnts.length > 0) {
      const storeCards = rsnts.map((rsnt) =>
        $("<div/>", {
          class: "col s4",
          html: storeCard(rsnt)
        })
      )

      let grid = $("<div/>")
      let row

      for (let i = 0; i < storeCards.length; i++) {
        if (i % 3 === 0) row = $("<div/>", { class: "row" })
        row.append(storeCards[i])
        if (i % 3 == 2 || i == storeCards.length - 1) grid.append(row)
      }

      return grid
    }
  })
}
