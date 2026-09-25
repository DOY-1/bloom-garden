/* =========================================
   BLOOM — A LITTLE GARDEN
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* =====================================
           GET HTML ELEMENTS
        ====================================== */

        const introScreen =
            document.getElementById(
                "introScreen"
            );

        const gardenScreen =
            document.getElementById(
                "gardenScreen"
            );

        const enterGarden =
            document.getElementById(
                "enterGarden"
            );

        const garden =
            document.getElementById(
                "garden"
            );

        const plantZone =
            document.getElementById(
                "plantZone"
            );

        const flowerLayer =
            document.getElementById(
                "flowerLayer"
            );

        const countNumber =
            document.getElementById(
                "countNumber"
            );

        const clearBtn =
            document.getElementById(
                "clearBtn"
            );

        const tapHint =
            document.getElementById(
                "tapHint"
            );


        /* =====================================
           SAFETY CHECK
           
           This prevents mysterious errors if
           an element is accidentally deleted.
        ====================================== */

        if (
            !introScreen ||
            !gardenScreen ||
            !enterGarden ||
            !garden ||
            !plantZone ||
            !flowerLayer ||
            !countNumber ||
            !clearBtn ||
            !tapHint
        ) {

            console.error(
                "Bloom: One or more required HTML elements are missing."
            );

            return;
        }


        /* =====================================
           VARIABLES
        ====================================== */

        let flowerCount = 0;


        /* =====================================
           FLOWER COLORS
        ====================================== */

        const flowerColors = [

            "#e87f9a",
            "#d96883",
            "#ef9b9c",
            "#e7a0b7",
            "#c96989",
            "#f19b7e",
            "#d97ba1",
            "#ed8794"

        ];


        /* =====================================
           ENTER GARDEN
        ====================================== */

        enterGarden.addEventListener(
            "click",
            () => {

                introScreen.classList.add(
                    "hidden"
                );

                gardenScreen.classList.remove(
                    "hidden"
                );

            }
        );


        /* =====================================
           CREATE TULIP
        ====================================== */

        function createTulip(
            clientX,
            clientY
        ) {

            const gardenRect =
                garden.getBoundingClientRect();


            /* ---------------------------------
               Convert screen coordinates into
               coordinates inside the garden.
            --------------------------------- */

            const x =
                clientX -
                gardenRect.left;

            const y =
                clientY -
                gardenRect.top;


            /* ---------------------------------
               Keep flower within screen width.
            --------------------------------- */

            const safeX =
                Math.max(
                    32,
                    Math.min(
                        gardenRect.width - 32,
                        x
                    )
                );


            /* ---------------------------------
               The user clicked the plant zone,
               so the Y coordinate is already
               guaranteed to be on the grass.

               We use the EXACT click position.
            --------------------------------- */

            const safeY =
                Math.max(
                    0,
                    Math.min(
                        gardenRect.height,
                        y
                    )
                );


            /* =================================
               RANDOM FLOWER APPEARANCE
            ================================= */

            const color =
                flowerColors[
                    Math.floor(
                        Math.random() *
                        flowerColors.length
                    )
                ];


            const rotation =
                -5 +
                Math.random() * 10;


            const scale =
                0.82 +
                Math.random() * 0.20;


            /* =================================
               CREATE FLOWER ELEMENT
            ================================= */

            const flower =
                document.createElement(
                    "div"
                );

            flower.className =
                "flower";


            flower.style.left =
                `${safeX}px`;


            flower.style.top =
                `${safeY}px`;


            flower.style.setProperty(
                "--flower-color",
                color
            );


            flower.style.setProperty(
                "--rotation",
                `${rotation}deg`
            );


            flower.style.setProperty(
                "--flower-scale",
                scale
            );


            /* =================================
               TULIP HTML
            ================================= */

            flower.innerHTML = `

                <div class="stem"></div>

                <div class="leaf leaf-left"></div>

                <div class="leaf leaf-right"></div>

                <div class="tulip-head">

                    <span></span>
                    <span></span>
                    <span></span>

                </div>

            `;


            /* =================================
               ADD TO FLOWER LAYER
            ================================= */

            flowerLayer.appendChild(
                flower
            );


            /* =================================
               BLOOM ANIMATION
            ================================= */

            requestAnimationFrame(
                () => {

                    requestAnimationFrame(
                        () => {

                            flower.classList.add(
                                "bloomed"
                            );

                        }
                    );

                }
            );


            /* =================================
               SPARKLE
            ================================= */

            createSparkle(
                safeX,
                safeY - 12
            );


            /* =================================
               UPDATE COUNTER
            ================================= */

            flowerCount++;

            countNumber.textContent =
                flowerCount;


            /* =================================
               HIDE HINT
            ================================= */

            if (
                flowerCount === 1
            ) {

                tapHint.style.opacity =
                    "0";

            }

        }


        /* =====================================
           CREATE SPARKLE
        ====================================== */

        function createSparkle(
            x,
            y
        ) {

            const sparkle =
                document.createElement(
                    "div"
                );


            sparkle.className =
                "sparkle";


            sparkle.style.left =
                `${x}px`;


            sparkle.style.top =
                `${y}px`;


            flowerLayer.appendChild(
                sparkle
            );


            setTimeout(
                () => {

                    sparkle.remove();

                },
                900
            );

        }


        /* =====================================
           PLANTING

           IMPORTANT:

           We listen ONLY to plantZone.

           Therefore:
           
           SKY = NOTHING
           MOON = NOTHING
           HEADER = NOTHING
           BUTTERFLY = NOTHING
           GRASS = FLOWER
        ====================================== */

        plantZone.addEventListener(
            "pointerdown",
            (event) => {

                /* ------------------------------
                   Ignore right mouse button
                ------------------------------ */

                if (
                    event.pointerType === "mouse" &&
                    event.button !== 0
                ) {

                    return;

                }


                /* ------------------------------
                   Stop browser touch gestures
                ------------------------------ */

                event.preventDefault();


                /* ------------------------------
                   Create flower
                ------------------------------ */

                createTulip(
                    event.clientX,
                    event.clientY
                );

            }
        );


        /* =====================================
           CLEAR BUTTON
        ====================================== */

        clearBtn.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                /* Remove all flowers */

                flowerLayer.innerHTML =
                    "";


                /* Reset count */

                flowerCount = 0;

                countNumber.textContent =
                    "0";


                /* Show hint again */

                tapHint.style.opacity =
                    "1";

            }
        );


        /* =====================================
           KEYBOARD

           ENTER = Open garden
           ESC   = Clear garden
        ====================================== */

        document.addEventListener(
            "keydown",
            (event) => {

                /* ENTER */

                if (
                    event.key === "Enter" &&
                    !introScreen.classList.contains(
                        "hidden"
                    )
                ) {

                    enterGarden.click();

                }


                /* ESCAPE */

                if (
                    event.key === "Escape"
                ) {

                    flowerLayer.innerHTML =
                        "";

                    flowerCount = 0;

                    countNumber.textContent =
                        "0";

                    tapHint.style.opacity =
                        "1";

                }

            }
        );


        /* =====================================
           PREVENT RIGHT CLICK
        ====================================== */

        garden.addEventListener(
            "contextmenu",
            (event) => {

                event.preventDefault();

            }
        );


        /* =====================================
           READY
        ====================================== */

        console.log(
            "Bloom Garden loaded successfully 🌷"
        );

    }
);
