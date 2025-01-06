let currentRotation = 0;

document.addEventListener("DOMContentLoaded", function() {
    const input = document.querySelector("#inputwish");
    const btn = document.querySelector("#makeit");

    input.addEventListener("input", validate);

    function validate() {
        btn.disabled = input.value.trim() === "";
    }
});

//*Opens the letter, hides and shows certain elements
function rotateDiv() {
    currentRotation += 180;
    document.getElementById('top').style.transform = `rotateX(${currentRotation}deg) translateY(205px)`;
    document.getElementById("clickme").style.display = "none";
    
    //*waits before runing
    setTimeout(() => {
        document.getElementById("text").style.display = "block";
        document.getElementById("inputwish").style.display = "block";
        document.getElementById("makeit").style.display = "block";
        document.getElementById("t").style.display = "block";
        document.getElementById("y").style.display = "block";
        document.getElementById("d").style.display = "block";
        document.getElementById("i").style.display = "block";
    }, 800);
}

async function changetext() {
    document.getElementById("text").textContent = "Prit pak."; //*Shows a message
    document.getElementById("wrapper").style.display = "block";

    const Wish = document.querySelector("#inputwish");
    const inputName = document.querySelector("#inputname");
    const inputMosha = document.querySelector("#inputage");

    const name = inputName ? inputName.value || null : null; //*Gets the Name
    const mosha = inputMosha ? parseInt(inputMosha.value) || null : null; //*Gets the age (Mosha)
    const wish = Wish.value; //*Gets the Wish

    await createWish(name, wish, mosha);

    document.getElementById("text").innerHTML = "Shpresoj që dëshira jote të realizohet."; //*Shows a message

    const wrapper = document.querySelector(".wrapper");

    wrapper.style.left = "0px";
    wrapper.style.top = "0px";

    if (!container.contains(wrapper)) {
        container.appendChild(wrapper);
    }

    wrapper.style.animation = "moveInsideContainer 5s linear infinite";

    setTimeout(() => {
        document.getElementById("wrapper").style.display = "none"; //*Hides the "loading bar" after a certain time
    }, 1500);
}

async function createWish(name, wish, mosha) {
    if (!wish || !wish.trim()) {
        console.error("Wish is required!");
        return;
    }

    const wishData = {
        Name: name || "",
        Wish: wish,
        Mosha: mosha || null,
        Viti: new Date()
    };

    const url = `https://happybirthday-rzwc.onrender.com/api/Wish/MakeAWish`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(wishData)
        });

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

//*asuhidjkad
//!ajosdhh
//?jdashfj
//TODO iajshbdfihkgsdf