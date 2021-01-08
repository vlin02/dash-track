class Restaurant {
  constructor(name, url, src, vendor) {
    this.vendor = vendor
    this.name = name
    this.url = url
    this.src = src
  }

  updateItem = (item, action = "add") =>
    this.vendor.fetchRestaurants().then((rsnts) => {
      const i = rsnts.findIndex(({ url }) => url === this.url)
      if (i === -1)
        return Promise.reject("Trying to access restaurant not added to vendor")

      const { items } = rsnts[i]
      const isSaved = items.some(({ name }) => name === item.name)

      switch (action) {
        case "add":
          if (!isSaved) return Promise.reject("This item is already unsaved")
          items = items.push(item)
          break
        case "remove":
          if (!isSaved) return Promise.reject("This item is already unsaved")
          items = items.filter(({ name }) => name !== item.name)
          break
        default:
      }

      rsnts[i].items = items
      chrome.storage.sync.set({ [this.vendor.name]: rsnts })
    })
}

class Vendor {
  constructor(name) {
    this.name = name
  }

  fetchRestaurants = () =>
    new Promise((resolve) =>
      chrome.storage.sync.get(this.name, (res) => {
        resolve(res[this.name] !== undefined ? res[this.name] : [])
      })
    )

  addRestaurant = (rsnt) =>
    this.fetchRestaurants().then((rsnts) => {
      const isFav = rsnts.some(({ url }) => url === rsnt.url)
      if (isFav) return Promise.reject("This restaurant is already favorited")

      rsnts.push({ ...rsnt, items: [], date_added: new Date().toJSON() })
      chrome.storage.sync.set({ [this.name]: rsnts })
    })

  removeRestaurant = (rsnt) =>
    this.fetchRestaurants().then((rsnts) => {
      const isFav = rsnts.some(({ url }) => url === rsnt.url)
      if (!isFav)
        return Promise.reject("This restaurant is already unfavorited")

      rsnts = rsnts.filter(({ url }) => url !== rsnt.url)
      chrome.storage.sync.set({ [this.name]: rsnts })
    })
}
