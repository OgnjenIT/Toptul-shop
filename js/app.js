const kontejner = document.querySelector(".container")
const dugmad = document.querySelectorAll("#addBtn")

const korpa = []

dugmad.forEach((dugme) => {
    dugme.addEventListener("click", () => {
        if (korpa.find((item) => {
            return item === dugme.previousElementSibling.innerHTML
        })) {
            alert("Ne mozete dodati jedan proizvod vise puta..")
        }
        else {
            const elementKorpe = document.createElement("div")
            elementKorpe.classList.add("proizvod")
            elementKorpe.innerHTML = dugme.previousElementSibling.innerHTML
            console.log("Dodali ste ");
            kontejner.append(elementKorpe)
            korpa.push(elementKorpe.innerHTML)
        }
    })
})