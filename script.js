/* =========================================================
   BLOOM — LITTLE TULIP GARDEN
========================================================= */

const intro = document.getElementById("intro");
const garden = document.getElementById("garden");
const enterGarden = document.getElementById("enterGarden");
const homeButton = document.getElementById("homeButton");

const ground = document.getElementById("ground");
const flowerLayer = document.getElementById("flowerLayer");
const flowerCount = document.getElementById("flowerCount");
const clickHint = document.getElementById("clickHint");

const butterfly = document.getElementById("butterfly");
const message = document.getElementById("message");

let flowerTotal = 0;
let butterflyX = 0;
let butterflyY = 0;
let butterflyFlight = null;


/* =========================================================
   TULIP COLORS
========================================================= */

const tulipColors = [
    {
        flower: "#e889a6",
        light: "#ffc4d5",
        dark: "#a94f70"
    },

    {
        flower: "#d96f86",
        light: "#f5acbb",
        dark: "#914052"
    },

    {
        flower: "#c985b6",
        light: "#edbddd",
        dark: "#754765"
    },

    {
        flower: "#a979c1",
        light: "#dcb0e4",
        dark: "#644275"
    },

    {
        flower: "#e0b85f",
        light: "#f7d996",
        dark: "#967139"
    },

    {
        flower: "#e78a73",
        light: "#f6b3a1",
        dark: "#994d43"
    },

    {
        flower: "#dd91ad",
        light: "#f5bfd1",
        dark: "#954c69"
    }
];


/* =========================================================
   ENTER GARDEN
========================================================= */

enterGarden.addEventListener("click", () => {

    intro.classList.add("hidden");

    setTimeout(() => {

        garden.classList.remove("hidden");

        startButterfly();

    }, 400);

});


/* =========================================================
   HOME
========================================================= */

homeButton.addEventListener("click", () => {

    garden.classList.add("hidden");

    if (butterflyFlight) {
        butterflyFlight.cancel();
    }

    setTimeout(() => {
        intro.classList.remove("hidden");
    }, 400);

});


/* =========================================================
   GROUND CLICK
========================================================= */

ground.addEventListener("click", (event) => {

    const rect = ground.getBoundingClientRect();

    /*
       X is relative to the ground.
       Y is converted to SCREEN coordinates.

       This fixes the flowers appearing
       from the top of the screen.
    */

    const x = event.clientX - rect.left;

    const groundY = event.clientY - rect.top;

    const screenY = rect.top + groundY;

    plantTulip(x, screenY);

});


/* =========================================================
   TOUCH
========================================================= */

ground.addEventListener("touchstart", (event) => {

    const touch = event.changedTouches[0];

    const rect = ground.getBoundingClientRect();

    const x = touch.clientX - rect.left;

    const screenY = touch.clientY;

    plantTulip(x, screenY);

}, {
    passive: true
});


/* =========================================================
   CREATE TULIP
========================================================= */

function plantTulip(x, screenY) {

    const tulip = document.createElement("div");

    tulip.className = "tulip";


    /* Random color */

    const color = randomItem(tulipColors);


    /*
       Cute proportions.

       The stem is tall enough,
       but the flower head stays small.
    */

    const height = random(145, 190);

    const scale = random(.86, 1.04);

    const rotation = random(-5, 5);


    /* Position */

    tulip.style.left = `${x - 41}px`;

    tulip.style.top = `${screenY - height}px`;

    tulip.style.height = `${height}px`;


    /* Color variables */

    tulip.style.setProperty(
        "--flower",
        color.flower
    );

    tulip.style.setProperty(
        "--light",
        color.light
    );

    tulip.style.setProperty(
        "--dark",
        color.dark
    );


    /*
       Slight natural variation.
    */

    tulip.style.rotate = `${rotation}deg`;

    tulip.style.scale = scale;


    /* =====================================================
       TULIP HTML
    ====================================================== */

    tulip.innerHTML = `

        <div class="tulip-stem"></div>

        <div class="leaf leaf-left"></div>

        <div class="leaf leaf-right"></div>

        <div class="tulip-head">

            <div class="petal petal-1"></div>

            <div class="petal petal-2"></div>

            <div class="petal petal-3"></div>

        </div>

    `;


    flowerLayer.appendChild(tulip);


    /* Counter */

    flowerTotal++;

    flowerCount.textContent = flowerTotal;


    /* Bloom particles */

    createBloomParticles(
        x,
        screenY - height
    );


    /* Hide instruction */

    if (flowerTotal === 1) {

        clickHint.style.opacity = "0";

    }


    /* Small message */

    if (
        flowerTotal === 7 ||
        flowerTotal === 15 ||
        flowerTotal === 25
    ) {

        setTimeout(showMessage, 900);

    }

}


/* =========================================================
   RANDOM NUMBER
========================================================= */

function random(min, max) {

    return Math.random() * (max - min) + min;

}


/* =========================================================
   RANDOM ARRAY ITEM
========================================================= */

function randomItem(array) {

    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];

}


/* =========================================================
   BLOOM PARTICLES
========================================================= */

function createBloomParticles(x, y) {

    const amount = Math.floor(
        random(4, 8)
    );


    for (let i = 0; i < amount; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "bloom-particle";


        particle.style.left =
            `${x}px`;

        particle.style.top =
            `${y}px`;


        flowerLayer.appendChild(
            particle
        );


        const angle =
            random(0, Math.PI * 2);


        const distance =
            random(20, 60);


        const targetX =
            Math.cos(angle) * distance;


        const targetY =
            Math.sin(angle) * distance;


        const animation =
            particle.animate(

                [

                    {
                        transform:
                            "translate(0,0) scale(.2)",

                        opacity: 0
                    },

                    {
                        transform:
                            `translate(
                                ${targetX / 2}px,
                                ${targetY / 2}px
                            ) scale(1)`,

                        opacity: .8
                    },

                    {
                        transform:
                            `translate(
                                ${targetX}px,
                                ${targetY}px
                            ) scale(.1)`,

                        opacity: 0
                    }

                ],

                {
                    duration: random(700, 1200),

                    easing: "ease-out"
                }

            );


        animation.onfinish = () => {
            particle.remove();
        };

    }

}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage() {

    message.classList.add("show");

    setTimeout(() => {

        message.classList.remove("show");

    }, 2300);

}


/* =========================================================
   BUTTERFLY START
========================================================= */

function startButterfly() {

    butterflyX =
        window.innerWidth * .2;

    butterflyY =
        window.innerHeight * .42;


    butterfly.style.left =
        `${butterflyX}px`;

    butterfly.style.top =
        `${butterflyY}px`;


    flyButterfly();

}


/* =========================================================
   BUTTERFLY FLIGHT
========================================================= */

function flyButterfly() {

    const maxX =
        Math.max(
            100,
            window.innerWidth - 110
        );


    /*
       Keep butterfly above the flowers.
    */

    const maxY =
        Math.max(
            200,
            window.innerHeight * .60
        );


    const nextX =
        random(60, maxX);


    const nextY =
        random(
            180,
            maxY
        );


    const dx =
        nextX - butterflyX;

    const dy =
        nextY - butterflyY;


    const direction =
        dx >= 0 ? 1 : -1;


    const angle =
        Math.atan2(dy, dx) *
        180 /
        Math.PI;


    const duration =
        random(5000, 8000);


    butterflyFlight =
        butterfly.animate(

            [

                {
                    left:
                        `${butterflyX}px`,

                    top:
                        `${butterflyY}px`,

                    transform:
                        `rotate(${angle}deg)
                         scaleX(${direction})`
                },

                {
                    left:
                        `${nextX}px`,

                    top:
                        `${nextY}px`,

                    transform:
                        `rotate(${angle}deg)
                         scaleX(${direction})`
                }

            ],

            {
                duration: duration,

                easing: "ease-in-out",

                fill: "forwards"
            }

        );


    butterflyX = nextX;

    butterflyY = nextY;


    butterflyFlight.finished
        .then(() => {

            flyButterfly();

        })
        .catch(() => {});

}


/* =========================================================
   MOON PARALLAX
========================================================= */

document.addEventListener(
    "mousemove",
    (event) => {

        const moon =
            document.querySelector(".moon");


        if (!moon) return;


        const x =
            event.clientX /
            window.innerWidth;


        const y =
            event.clientY /
            window.innerHeight;


        moon.style.transform =
            `translate(
                ${(x - .5) * 12}px,
                ${(y - .5) * 12}px
            )`;

    }
);


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            garden.classList.add("hidden");

            if (butterflyFlight) {
                butterflyFlight.cancel();
            }

            setTimeout(() => {

                intro.classList.remove(
                    "hidden"
                );

            }, 300);

        }

    }
);