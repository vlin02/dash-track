conditions = [
    (e) => e.id == "root",
    (e) => e.nodeName == "DIV" && e.className == "",
    (e) => e.className == "sc-gzVnrw ipJBfZ",
    (e) => e.className == "sc-bYSBpT fEJYvd",
    (e) => e.className == "sc-gxMtzJ hCivtC",
    (e) => e.className == "sc-hpAzQi gdkNys",
    (e) => e.nodeName == "HEADER",
    (e) => e.className == "sc-chAAoq gqyxRS",
    (e) => e.nodeName == "H1",
];

nestedObserver = async (conditions, callback) => {
    let observer

    const listeners = conditions.map(
      condition => parent =>
        new Promise((resolve) => {
          
          for (const child of parent.children){
              if (condition(child)) resolve(child);
          }
  
          observer = new MutationObserver((mutations) => {
              for (let mr of mutations) {
                  if (condition(mr.target)) {
                      resolve(mr.target);
                  }
              }
          });
  
          observer.observe(parent, { childList: true }, {subTree: true});
        })
    );
    
    var parent = document.body
    for (const listener of listeners){
      parent = await listener(parent)
      alert(parent.className)
      observer.disconnect()
    }
  
    callback(parent)
  };
  

nestedObserver(conditions, el => console.log(el.id))
