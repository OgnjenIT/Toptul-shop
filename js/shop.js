// const kontejner = document.querySelector(".containerKorpe")
// const dugmad = document.querySelectorAll("#addBtn")

// const korpa = []

// dugmad.forEach((dugme) => {
//     dugme.addEventListener("click", () => {
//         if (korpa.find((item) => {
//             return item === dugme.previousElementSibling.innerHTML
//         })) {
//             alert("Ne mozete dodati jedan proizvod vise puta..")
//         }
//         else {
//             const elementKorpe = document.createElement("div")
//             elementKorpe.classList.add("proizvod")
//             elementKorpe.innerHTML = dugme.previousElementSibling.innerHTML
//             console.log("Dodali ste ");
//             kontejner.append(elementKorpe)
//             korpa.push(elementKorpe.innerHTML)
//         }
//     })
// })
const addBtns = document.querySelectorAll(".addBtn");
const korpaKontejner = document.querySelector(".containerKorpe");

addBtns.forEach((addBtn) => {
    addBtn.addEventListener("click", () => {
        const proizvod = addBtn.closest('.proizvod'); // Pronalazi roditeljski element proizvoda
        const proizvodKlon = proizvod.cloneNode(true); // Klona proizvoda koji se dodaje u korpu
        const removeBtn = document.createElement("button"); // Kreiranje dugmeta "Ukloni"
        removeBtn.classList.add("btn", "btn-danger", "removeBtn");
        removeBtn.textContent = "Ukloni";

        // Dodavanje funkcionalnosti uklanjanja proizvoda iz korpe
        removeBtn.addEventListener("click", () => {
            proizvodKlon.remove(); // Uklanjanje proizvoda iz korpe
        });

        const cardBody = proizvodKlon.querySelector(".card-body");
        const existingAddBtn = cardBody.querySelector(".addBtn");

        if (existingAddBtn) {
            existingAddBtn.remove(); // Uklanjanje dugmeta "Dodaj u korpu" iz kartice proizvoda
        }

        cardBody.appendChild(removeBtn); // Dodavanje dugmeta "Ukloni" u karticu proizvoda
        korpaKontejner.appendChild(proizvodKlon); // Dodavanje kopije proizvoda u korpu
    });
});