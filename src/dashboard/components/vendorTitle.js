class vendorTitle {
  constructor() {
    this.e = $("<h2/>", {
      style: "line-height: 90%; margin: 0px 0px 0px 0px;"
    })
  }

  get = () => this.e

  set = (v_name, color) => {
    this.e.html(v_name)
    this.e.css({ color })
  }
}
