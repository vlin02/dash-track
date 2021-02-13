class dashboard {
  vendors = {
    doordash: {
      title: "DoorDash",
      color: "#EC4528",
      link: "https://doordash.com/"
    },
    ubereats: {
      title: "UberEats",
      color: "#529F08",
      link: "https://ubereats.com/"
    },
    grubhub: {
      title: "GrubHub",
      color: "#F74A55",
      link: "https://grubhub.com/"
    }
  }
  
  settings = new Settings()

  vendorTitle = new vendorTitle()

  doordashBtn = new vendorButton("doordash", "doordash-vendor-btn")

  ubereatsBtn = new vendorButton("ubereats")

  grubhubBtn = new vendorButton("grubhub")

  defaultBtn = new defaultButton(false)

  gridView = new gridView()

  unfavoriteModal = new unfavoriteModal(this.doUnfavorite)

  constructor() {
    for (const v_name1 of Object.keys(this.vendors)) {
      this[`${v_name1}Btn`].e.click(() => this.setVendor(v_name1))
    }

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
    }).append([
      logo,
      header,
      divider,
      this.gridView.get(),
      this.unfavoriteModal.get()
    ])

    this.settings
      .defaultFetch()
      .then(({ default_vendor }) => this.setVendor(default_vendor))

    $("body").prepend(content)
  }

  setVendor = (v_name) => {
    this.vendorTitle.set(this.vendors[v_name])

    for (const v_name1 of Object.keys(this.vendors)) {
      if (v_name1 == v_name) {
        this[`${v_name1}Btn`].setSelected()
      } else {
        this[`${v_name1}Btn`].setNotSelected()
      }
    }

    this.settings.defaultFetch().then(({ default_vendor }) => {
      const { setDefault, setNotDefault } = this.defaultBtn
      v_name == default_vendor ? setDefault() : setNotDefault()

      this.defaultBtn.e.off("click")
      this.defaultBtn.e.click(() => {
        this.settings.update({ default_vendor: v_name })
        this.defaultBtn.setDefault()
      })
    })

    this.renderGrid(new Vendor(v_name))
  }

  doUnfavorite = (rsnt) => {
    const vendor = new Vendor(rsnt.vendor)
    
    vendor
      .removeRestaurant(rsnt)
      .then(() => this.renderGrid(vendor))
      .catch(alert)
  }

  renderGrid = (vendor) => {
    vendor.defaultFetch().then(({ rsnts }) => {
      rsnts = Object.values(rsnts).sort(
        (a, b) => new Date(b.date_added) - new Date(a.date_added)
      )

      this.gridView.set(rsnts, (rsnt) => {
        if (rsnt.items.length > 0) {
          this.unfavoriteModal.set(rsnt)
          this.unfavoriteModal.e.modal("open")
        } else {
          this.doUnfavorite(rsnt)
        }
      })
    })
  }
  
}
