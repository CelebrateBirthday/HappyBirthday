let currentRotation = 0;

document.addEventListener("DOMContentLoaded", function() {
    const input = document.querySelector("#inputwish");
    const btn = document.querySelector("#makeit");

    input.addEventListener("input", validate);

    function validate() {
        btn.disabled = input.value.trim() === "";
    }
});

//* Opens the letter, hides and shows certain elements
function rotateDiv() {
    currentRotation += 180;
    document.getElementById('top').style.transform = `rotateX(${currentRotation}deg) translateY(205px)`;
    document.getElementById("clickme").style.display = "none";
    
    //* Waits before runing
    setTimeout(() => {
        document.getElementById("message").style.display = "block";
        document.getElementById("inputwish").style.display = "block";
        document.getElementById("makeit").style.display = "block";
    }, 800);
}

async function changetext() {
    document.getElementById("message").textContent = "Prit pak."; //* Shows a message
    document.getElementById("wrapper").style.display = "block"; //TODO If you don't want the "loading bar" just delete or comment this line

    const Wish = document.querySelector("#inputwish");
    const inputName = document.querySelector("#inputname");
    const inputMosha = document.querySelector("#inputage");

    const name = inputName ? inputName.value || null : null; //* Gets the Name
    const mosha = inputMosha ? parseInt(inputMosha.value) || null : null; //* Gets the age (Mosha)
    const wish = Wish.value; //* Gets the Wish

    await createWish(name, wish, mosha);

    document.getElementById("message").innerHTML = "Shpresoj që dëshira jote të realizohet."; //* Shows a message
    document.getElementById("wrapper").style.display = "none";

    const wrapper = document.querySelector(".wrapper");

    wrapper.style.left = "0px";
    wrapper.style.top = "0px";

    if (!container.contains(wrapper)) {
        container.appendChild(wrapper);
    }

    wrapper.style.animation = "moveInsideContainer 5s linear infinite";

    setTimeout(() => {
        document.getElementById("wrapper").style.display = "none";
    }, 2000); //* Hides the "loading bar" after a certain time
}

async function createWish(name, wish, mosha) {
    if (!wish || !wish.trim()) {
        console.error("Wish is required!");
        return;
    }

    // Create the wish data object
    const wishData = {
        Name: name || "",
        Wish: wish,
        Mosha: mosha || null,
        Viti: new Date()
    };

    // Proceed to send the request to the backend if validation is successful
    const url = `https://happybirthday-rzwc.onrender.com/api/Wish/MakeAWishsssssssssssssssssssssssssssssssssssssssssssss`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(wishData)
        });

        //! Error handling
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Response status: ${response.status}, Error: ${errorText}`);
        }

        const json = await response.json();
        console.log("Server response:", json);

        if (json.message) {
            console.log(json.message);
        }
    } catch (error) {
        console.error("Error submitting the wish:", error.message);
    }
}