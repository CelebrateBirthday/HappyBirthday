let currentRotation = 0;

document.addEventListener("DOMContentLoaded", function() {
    const input = document.querySelector("#inputwish");
    const btn = document.querySelector("#makeit");

    input.addEventListener("input", validate);

    function validate() {
        btn.disabled = input.value.trim() === "";
    }
});

function rotateDiv() {
    currentRotation += 180;
    document.getElementById('top').style.transform = `rotateX(${currentRotation}deg) translateY(205px)`;
    document.getElementById("clickme").style.display = "none";

    setTimeout(() => {
        document.getElementById("text").style.display = "block";
        document.getElementById("inputwish").style.display = "block";
        document.getElementById("makeit").style.display = "block";
    }, 800);
}

async function changetext() {
    document.getElementById("text").innerHTML = "Wait a moment.";

    const Wish = document.querySelector("#inputwish");
    const inputName = document.querySelector("#inputname");
    const inputMosha = document.querySelector("#inputage");

    const name = inputName ? inputName.value || null : null;
    const mosha = inputMosha ? parseInt(inputMosha.value) || null : null;
    const wish = Wish.value;

    await createWish(name, wish, mosha);
    document.getElementById("text").innerHTML = "I hope your wish comes true.";
}

async function createWish(name, wish, mosha) {
    // Validate the wish
    if (!wish || !wish.trim()) {
        console.error("Wish is required!");
        return; // Exit the function if the wish is not valid
    }

    // Create the wish data object
    const wishData = {
        Name: name || "", // Set empty string if name is null or empty
        Wish: wish,        // Required field
        Mosha: mosha || null, // If Mosha is null, send null
        Viti: new Date()    // Automatically set Viti to the current date
    };

    // Proceed to send the request to the backend if validation is successful
    const url = `https://happybirthday-7gnr.onrender.com/api/Wish/MakeAWish`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(wishData)
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error("Error submitting the wish:", error.message);
    }
}

// Optional: Remove if you don't need it
// setInterval(() => {
//     fetch('https://happybirthday-7gnr.onrender.com')
//         .then(response => {
//             if (response.ok) {
//                 console.log('Pinged backend successfully:', response.status);
//             } else {
//                 console.error('Backend responded with an error:', response.status);
//             }
//         })
//         .catch(err => {
//             console.error('Error pinging backend:', err);
//         });
// }, 870000);