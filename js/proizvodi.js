// JavaScript
const addBtns = document.querySelectorAll(".addBtn");
const korpaKontejner = document.querySelector(".containerKorpe");
let ukupnaCijena = 0; // Varijabla za praćenje ukupne cijene
let initialized = false; // Da bismo provjerili je li event listener već dodan

addBtns.forEach((addBtn) => {
    addBtn.addEventListener("click", (e) => {
        e.preventDefault()
        const proizvod = addBtn.closest('.proizvod'); // Pronalazi roditeljski element proizvoda
        const proizvodKlon = proizvod.cloneNode(true); // Klona proizvoda koji se dodaje u korpu

        alert("Uspjesno dodano!")
        // Uklanja postojeće dugme "Dodaj u korpu" iz kopije proizvoda
        const existingAddBtn = proizvodKlon.querySelector(".addBtn");
        if (existingAddBtn) {
            existingAddBtn.remove();
        }

        const removeBtn = document.createElement("button"); // Kreiranje dugmeta "Ukloni"
        removeBtn.classList.add("btn", "btn-danger", "removeBtn");
        removeBtn.textContent = "Ukloni";

        // Dodavanje funkcionalnosti uklanjanja proizvoda iz korpe
        removeBtn.addEventListener("click", () => {
            proizvodKlon.remove(); // Uklanjanje proizvoda iz korpe
            azurirajUkupnuCijenu(); // Ažuriranje ukupne cijene nakon uklanjanja proizvoda
        });




        // Kreiranje dugmeta "Ukloni sve iz korpe" samo ako već nije stvoreno
        if (!document.querySelector('.removeAllBtn')) {
            const removeAllBtn = document.createElement("button");
            removeAllBtn.classList.add("btn", "btn-danger", "removeAllBtn");
            removeAllBtn.textContent = "Ukloni sve iz korpe";

            // Dodavanje funkcionalnosti za brisanje svih proizvoda iz korpe
            removeAllBtn.addEventListener("click", () => {
                const proizvodiUKorpi = korpaKontejner.querySelectorAll('.proizvod');
                proizvodiUKorpi.forEach((proizvod) => {
                    proizvod.remove(); // Uklanjanje svakog proizvoda iz korpe
                });
                ukupnaCijena = 0; // Resetiranje ukupne cijene
                azurirajUkupnuCijenu(); // Ažuriranje prikaza ukupne cijene
                removeAllBtn.remove(); // Uklanja dugme "Ukloni sve iz korpe" nakon klika
            });

            // Dodavanje dugmeta "Ukloni sve iz korpe" u modal-footer
            const modalFooter = document.querySelector('.modal-footer');
            modalFooter.appendChild(removeAllBtn);
        }



        const cijena = proizvodKlon.querySelector(".cijena");
        cijena.insertAdjacentElement('afterend', removeBtn); // Dodavanje dugmeta "Ukloni" ispod taga sa cijenom

        // Dodavanje kloniranog proizvoda u korpu
        korpaKontejner.appendChild(proizvodKlon);

        // Ažuriranje ukupne cijene nakon dodavanja proizvoda
        const cijenaElement = proizvodKlon.querySelector('.cijena');
        if (cijenaElement) {
            ukupnaCijena += parseFloat(cijenaElement.textContent.replace('$', ''));
        }
        azurirajUkupnuCijenu(); // Ažuriranje prikaza ukupne cijene
    });
});

// Funkcija za ažuriranje prikaza ukupne cijene
function azurirajUkupnuCijenu() {
    ukupnaCijena = 0; // Resetiranje ukupne cijene
    const proizvodiUKorpi = korpaKontejner.querySelectorAll('.proizvod');
    proizvodiUKorpi.forEach((proizvod) => {
        const cijenaElement = proizvod.querySelector('.cijena');
        if (cijenaElement) {
            ukupnaCijena += parseFloat(cijenaElement.textContent.replace('$', ''));
        }
    });
    const ukupnaCijenaElement = document.getElementById('ukupnaCijena');
    ukupnaCijenaElement.textContent = ukupnaCijena.toFixed(2); // Prikazujemo ukupnu cijenu sa dvije decimale
}

document.querySelector('.bi-cart').addEventListener('click', function () {
    var myModal = new bootstrap.Modal(document.getElementById('korpaModal'));
    myModal.show();
});
