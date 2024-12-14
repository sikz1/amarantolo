// the future is static
const galleries = {
  location_gallery: {
    title: "La location",
    imgs: ["orto.png", "casa.jpg", "cibo.jpg"]
  },
  produce_gallery: {
    title: "I nostri prodotti",
    imgs: ["orto.png", "casa.jpg", "cibo.jpg"]
  },
  products_gallery: {
    title: "I nostri servizi",
    imgs: ["territorio.jpg", "tramonto.jpg", "orto.png"]
  },  
  interior_gallery: {
    title: "Gli interni",
    imgs: ["casa.jpg", "alloggi.jpg", "cibo.jpg"]
  },
  exterior_gallery: {
    title: "Gli esterni",
    imgs: ["tramonto.jpg", "orto.png", "alloggi.jpg"]
  },
  views_gallery: {
    title: "La nostra terra",
    imgs: ["tramonto.jpg", "cibo.jpg", "casa.jpg"]
  }
}

const comments = [
  { 
    author: "Giorgio Meloni",
    comment: "La patria che in Maratea riconosce la sua tirrenica perla, elogia la maschia determinazione e il cattolico improperio di chi fortissimamente strappa un reddito alla vile roccia alburna"
  },
  { 
    author: "Bombolo",
    comment: "Ts' ts', io manco ce volevo venì"
  },
  { 
    author: "Crescenzio Pepe",
    comment: "Uannemaramaronn' Manuè, chist' è nu ddie post', altro c' o' paradis' ca sta chin' e' gente"
  },
  { 
    author: "C1P8",
    comment: c1p8()
  }
]

const modal_name = "gallery_modal"
const max_interval = 20000
const min_interval = 5000

function rnd(max) {
  return Math.round(Math.random() * 10 * max) % max
}

function c1p8() {
  out = ""
  for (i=0; i<23; i++) {
    chr = rnd(5) == 0 ? " " : "&#" + (9620 + rnd(100))
    out += chr
  }
  return (out + " !!!")
}

function populate_gallery(gallery_id, gallery, caller) {
  lmnt = document.getElementById(gallery_id).getElementsByClassName('carousel-inner')[0]
  if (!lmnt) { return false }
  src = caller ? caller.getAttribute('src').split('/').pop() : null

  for (idx in galleries[gallery]['imgs']) {
    if (src)
      act = galleries[gallery]['imgs'][idx] == src ? 'active' : ''      
    else
      act = idx == 0 ? ' active' : ''

    item = document.createElement("div")
    item.classList = "carousel-item " + act

    img = document.createElement("img")
    img.classList = "bd-placeholder-img bd-placeholder-img-lg d-block w-100 bbl-rnd"
    img.onclick = function() { show_gallery(gallery, this) }
    img.src = "/amarantolo/assets/imgs/" + galleries[gallery]['imgs'][idx]

    item.appendChild(img)
    lmnt.appendChild(item)
  }
}

function populate_galleries() {
  for (idx in galleries) { populate_gallery(idx, idx, null) }
}

function show_gallery(gallery, caller) {
  if (document.getElementById('gallery_modal').checkVisibility())
    return false;

  modttl = document.getElementById('gallery-title');
  modcnt = document.getElementById('gallery-content');

  modttl.innerHTML = galleries[gallery]['title']
  populate_gallery('active_gallery', gallery, caller)
  
  mod = new bootstrap.Modal('#' + modal_name, {});
  mod.show()
}

document.addEventListener("DOMContentLoaded", function() {
  slides = document.getElementsByClassName('carousel','slide')
  for (el in slides) {
    if (slides[el].nodeName != 'DIV') { continue }
    if (slides[el].getAttribute('data-bs-interval')) { continue }
    slides[el].setAttribute('data-bs-interval', rnd(max_interval) + min_interval)
  }
})

document.addEventListener("DOMContentLoaded", function() {
  idx = rnd(comments.length)
  document.getElementById('comment').innerHTML = comments[idx]['comment']
  document.getElementById('author').innerHTML = comments[idx]['author']
})

document.addEventListener("DOMContentLoaded", populate_galleries())

document.getElementById(modal_name).addEventListener('hidden.bs.modal', event => {
  document.getElementById('gallery-content').innerHTML = ""
})
