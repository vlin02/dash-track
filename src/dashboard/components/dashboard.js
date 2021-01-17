class dashboard {
  vendors = {
    doordash: {
      title: "DoorDash",
      color: "#ec4528"
    },
    ubereats: {
      title: "UberEats",
      color: "#ec4528"
    },
    grubhub: {
      title: "GrubHub",
      color: "#ec4528"
    }
  }

  constructor() {
    this.vendorTitle = new vendorTitle()

    this.doordashBtn = new vendorButton("doordash", "doordash-vendor-btn")
    this.ubereatsBtn = new vendorButton("ubereats")
    this.grubhubBtn = new vendorButton("grubhub")

    this.defaultBtn = new defaultButton(false)

    this.gridView = new gridView()

    const header = $("<div/>", {
      class: "row valign-wrapper",
      style: "margin-top: 0px"
    }).append([
      $("<div/>", { class: "col" }).append(this.vendorTitle.get()),
      $("<div/>", { class: "col" }).append(this.doordashBtn.get()),
      $("<div/>", { class: "col" }).append(this.ubereatsBtn.get()),
      $("<div/>", { class: "col" }).append(this.grubhubBtn.get()),
      $("<div/>", {
        class: "col",
        style: "margin-left: auto"
      }).append(this.defaultBtn.get())
    ])

    const logo = $("<div/>", {
      class: "row center-align",
      style: "margin-bottom: 0px",
      html: "<img src='../../images/dash-track-logo.svg' style='height:40px'/>"
    })

    const divider = $("<hr/>", {
      size: 2,
      style: "margin: 0px 10px 20px 10px",
      color: "#E5E5E5"
    })

    const content = $("<div/>", {
      style: "width: 95vw; margin: auto; margin-top: 15px"
    }).append([logo, header, divider, this.gridView.get()])

    this.setVendor("doordash")

    $("body").prepend(content)
  }

  setVendor = (v_name) => {
    const vendor = new Vendor(v_name)

    const { title, color } = this.vendors[v_name]
    this.vendorTitle.set(title, color)

    for (const v_name1 of Object.keys(this.vendors)) {
      if (v_name1 == v_name) {
        this[`${v_name1}Btn`].setSelected()
      } else {
        this[`${v_name1}Btn`].setNotSelected()
      }
    }

    this.fetchDefaultVendor().then((default_name) => {
      const { setDefault, setNotDefault } = this.defaultBtn
      v_name == default_name ? setDefault() : setNotDefault()
    })

    vendor.defaultFetch().then(({ rsnts }) => {
      rsnts = Object.values(rsnts).sort(
        (a, b) => new Date(b.date_added) - new Date(a.date_added)
      )
      this.gridView.set(rsnts)
    })
  }

  fetchDefaultVendor = () =>
    new Promise((resolve) =>
      chrome.storage.sync.get({ default_vendor: "doordash" }, (res) =>
        resolve(res.default_vendor)
      )
    )
}
