const observer = new MutationObserver(() => {
  const storeName = $(".sc-dTLGrV.gYYmdm")

  if (storeName !== undefined) {
    if (storeName.text !== "Hijacked") {
      storeName.text("Hijacked")
      storeName.before(
        $.parseHTML(`
          <div class="d-inline-flex w-100 justify-content-between'>
            <button class="btn btn-danger">
              Add to favorites <img src="https://icongr.am/fontawesome/star.svg?size=17&color=ffffff">
            </button>
            ${storeName.prop('outerHTML')}
          </div>
        `)
      )
    } else {
      observer.disconnect()
    }
  }
})

observer.observe(document.body, { childList: true, subtree: true })
