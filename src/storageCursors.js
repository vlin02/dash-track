class Restaurant {
  constructor(name, url, src, vendor) {
    this.vendor = vendor
    this.name = name
    this.url = url
    this.src = src
  }

  updateItem = (item_name, action = "add") =>
    this.vendor.defaultFecth().then((vendor) => {
      const { rsnts } = vendor
      const rsnt = rsnts[this.url]

      if (rsnt === undefined)
        return Promise.reject("Trying to access restaurant not added to vendor")

      const { items } = rsnt
      const isSaved = items.includes(item_name)

      switch (action) {
        case "add":
          if (isSaved) return Promise.reject("This item is already saved")
          items = items.push(item)
          break
        case "remove":
          if (!isSaved) return Promise.reject("This item is already unsaved")
          items = items.filter((name) => name !== item_name)
          break
        default:
      }
      rsnt.items = items

      chrome.storage.sync.set({ [this.vendor.name]: { ...vendor, rsnts } })
    })
}

class Vendor {
  constructor(name) {
    this.name = name
  }

  defaultFetch = () =>
    new Promise((resolve) => {
      const defaultObj = {
        name: this.name,
        rsnts: {}
      }
      chrome.storage.sync.get({ [this.name]: defaultObj }, (res) =>
        resolve(res[this.name])
      )
    })

  addRestaurant = (rsnt) =>
    this.defaultFetch().then((vendor) => {
      const { rsnts } = vendor
      if (rsnt.url in rsnts)
        return Promise.reject("This restaurant is already favorited")

      rsnts[rsnt.url] = { ...rsnt, items: [], date_added: new Date().toJSON() }
      chrome.storage.sync.set({ [this.name]: { ...vendor, rsnts } })
    })

  removeRestaurant = (rsnt) =>
    this.defaultFetch().then((vendor) => {
      const { rsnts } = vendor
      if (!(rsnt.url in rsnts))
        return Promise.reject("This restaurant is already unfavorited")

      delete rsnts[rsnt.url]
      chrome.storage.sync.set({ [this.name]: { ...vendor, rsnts } })
    })
}
