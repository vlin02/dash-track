document.head.insertAdjacentHTML('beforeEnd',
    `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>`
)

observer = new MutationObserver(() => {
  const titleDiv = $(".sc-dTLGrV.gYYmdm")
  
  if (titleDiv !== undefined) {
      console.log("we here")
    var titleParent = titleDiv.parent()
    titleDiv.remove()
    observer.disconnect()
  }
});

observer.observe(document.body, { childList: true, subtree: true });
