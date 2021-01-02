const observer = new MutationObserver(() => {
  const storeName = $(".sc-dTLGrV.gYYmdm")

  if (storeName !== undefined) {
    if (storeName.prop("outerHTML") !== undefined) {
      storeName.replaceWith(
        $.parseHTML(`
          <div class="d-inline-flex w-100 justify-content-between">
            ${storeName.prop("outerHTML")}  
            <button class="btn btn-danger">
              Add to favorites <img src="https://icongr.am/fontawesome/star.svg?size=17&color=ffffff">
            </button>
          </div>
        `)
      )
      observer.disconnect()
    }
  }
})

observer.observe(document.body, { childList: true, subtree: true })