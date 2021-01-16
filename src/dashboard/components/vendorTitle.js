const vendorTitle = (v_name, color) =>
  $("<div/>", { class: "col" }).append(
    $("<h2/>", {
      style: `line-height: 90%; margin: 0px 0px 0px 0px; color: ${color}`,
      html: v_name
    })
  )
