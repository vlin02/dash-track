class unfavoriteModal {
  constructor(onConfirm) {
    this.onConfirm = onConfirm

    this.e = $("<div/>", {
      class: "modal",
      style: "width: 400px !important;",
      html: `
        <div class="modal-content">
            <h4 class="red-text text-accent-2">Confirm Unfavorite</h4>
           
        </div>
        <div class="modal-footer">
        </div>
        `
    })

    this.modalDetails = $("<h6/>", { style: "line-height: 1.5;" })

    this.confirmBtn = $("<button/>", {
      class: "waves-effect waves-red waves-accent-3 btn-flat",
      html: "Unfavorite"
    })

    this.e.find(".modal-content").append(this.modalDetails)
    this.e.find(".modal-footer").append(this.confirmBtn)
    this.e.modal()
  }

  set = (rsnt) => {
    const { name, items } = rsnt

    this.modalDetails.html(
      `Unfavoriting <strong>${name}</strong> will also remove the <strong>${items.length}</strong> items saved`
    )

    this.confirmBtn.off("click")
    this.confirmBtn.click(() => {
      this.onConfirm(rsnt)
      this.e.modal("close")
    })
  }

  get = () => this.e
}
