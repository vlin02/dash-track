define(["materialize", "jquery"], (_, $) => {
    class UnfavoriteModal {

        constructor(onConfirm) {
            this.onConfirm = onConfirm

            this.e = $("<div/>", {
                class: "modal",
                style: "width: 400px !important;",
                html: `
                    <div class="modal-content" style="padding-bottom: 0px">
                    </div>
                    <div class="modal-footer" style="padding: 0px">
                    </div>
                `
            })

            this.modalDetails = $("<h6/>", { style: "line-height: 1.5;" })

            this.confirmBtn = $("<button/>", {
                class: "waves-effect waves-red waves-accent-3 btn-flat",
                style: "margin-right: 20px",
                html: "Unfavorite"
            })

            this.e.find(".modal-content").append(this.modalDetails)
            this.e.find(".modal-footer").append(this.confirmBtn)
            this.e.modal()
        }

        get = () => this.e

        show = () => this.e.modal("open")

        set = (vendor, rsnt) => {
            const { name } = rsnt

            this.modalDetails.html(
                `
                <h4 class="red-text text-accent-2">Confirm Unfavorite</h4>
                <p>Unfavoriting <strong>${name}</strong> will also delete all associated restaurant info</p>
                `
            )

            this.confirmBtn.off("click")
            this.confirmBtn.click(() => {
                this.onConfirm(vendor, rsnt)
                this.e.modal("close")
            })
        }
    }

    return UnfavoriteModal
})
