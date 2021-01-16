const vendor = new Vendor("doordash")
vendor.defaultFetch().then(({ rsnts }) => {
  const btn = new defaultButton(false)
  btn.get().click(btn.setDefault)
  const vTitle = vendorTitle("DoorDash", "#ec4528")

  const doordashBtn = new vendorButton("doordash", true, "doordash-vendor-btn")
  const grubhubBtn = new vendorButton("grubhub", false)
  const ubereatsBtn = new vendorButton("ubereats", false)

  let header = $("<div/>", {
    class: "row valign-wrapper",
    style: "margin-top: 0px"
  }).append([
    $("<div/>", { class: "col" }).append(vTitle),
    $("<div/>", { class: "col" }).append(doordashBtn.get()),
    $("<div/>", { class: "col" }).append(ubereatsBtn.get()),
    $("<div/>", { class: "col" }).append(grubhubBtn.get()),
    $("<div/>", {
      class: "col",
      style: "margin-left: auto"
    }).append(btn.get())
  ])

  const content = $("<div/>", {
    style: "width: 95vw; margin: auto; margin-top: 15px"
  }).append([
    $("<div/>", {
      class: "row center-align",
      style: "margin-bottom: 0px",
      html: "<img src='../../images/dash-track-logo.svg' style='height:40px'/>"
    }),
    header,
    $("<hr/>", {
      size: 2,
      style: "margin: 0px 10px 20px 10px",
      color: "#E5E5E5"
    }),
    ...renderGridView(Object.values(rsnts))
  ])

  $("body").prepend(content)
})
