observer = new MutationObserver(() => {
  const titleDiv = [].concat(
      Array.from(document.getElementsByClassName("sc-dTLGrV gYYmdm sc-kVyEtE efQmPr")),
      Array.from(document.getElementsByClassName("sc-dTLGrV gYYmdm sc-dyKSPo gutEGH")),
  )[0]
  
  if (titleDiv !== undefined && titleDiv.innerText !== "Hijacked") {
    titleDiv.innerText="Hijacked"
    console.log('found')
  }
});

observer.observe(document.body, { childList: true, subtree: true });
