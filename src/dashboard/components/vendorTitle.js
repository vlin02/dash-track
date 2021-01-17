class vendorTitle {
  constructor() {
    this.e = $("<a/>")

    this.text = $("<h2/>", {
      style: "line-height: 90%; margin: 0px 0px 0px 0px;"
    })

    this.e.append(this.text)
  }

  get = () => this.e

  set = (v_info) => {
    const { title, link, color } = v_info

    this.e.attr('href', link)

    this.text.html(title)
    this.text.css({ color })
  }
}
