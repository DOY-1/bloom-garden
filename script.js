/* ==========================================
   BLOOM — A LITTLE GARDEN
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* ======================================
           ELEMENTS
        ======================================= */

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


        /* ======================================
           VARIABLES
        ======================================= */

        let flowerCount = 0;


        /*
         * Random tulip colors
         */
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


        /* ======================================
           ENTER GARDEN
        ======================================= */

        enterGarden.addEventListener(
            "click",
            () => {

                introScreen.classList.add(
                    "hidden"
                );

                gardenScreen.classList.remove(
                    "hidden"
                );

                /*
                 * Give the browser a moment to
                 * render the garden before
                 * enabling interactions.
                 */
                setTimeout(() => {

                    gardenScreen.classList.add(
                        "active"
                    );

                }, 50);

            }
        );


        /* ======================================
           CREATE TULIP
        ======================================= */

        function createTulip(
            clientX,
            clientY
        ) {

            const rect =
                garden.getBoundingClientRect();


            /*
             * Convert screen coordinates
             * to garden coordinates.
             */

            const x =
                clientX - rect.left;

            const y =
                clientY - rect.top;


            /*
             * The plant-zone is shaped like
             * the visible grass.
             *
             * Because this function is only
             * called from plantZone, we know
             * the user clicked the ground.
             */


            /* ==================================
               KEEP FLOWER INSIDE THE SCREEN
            =================================== */

            const flowerWidth = 60;

            const safeX =
                Math.max(
                    flowerWidth / 2,
                    Math.min(
                        rect.width -
                        flowerWidth / 2,
                        x
                    )
                );


            /*
             * Keep the flower from being
             * planted too close to the bottom.
             */

            const safeY =
                Math.max(
                    0,
                    Math.min(
                        rect.height - 25,
                        y
                    )
                );


            /* ==================================
               RANDOM APPEARANCE
            =================================== */

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
                Math.random() * 0.22;


            /* ==================================
               CREATE FLOWER
            =================================== */

            const flower =
                document.createElement(
                    "div"
                );

            flower.className =
                "flower";


            flower.style.left =
                `${safeX}px`;


            /*
             * IMPORTANT:
             *
             * top = exact location where
             * the user clicked.
             *
             * transform translateY(-100%)
             * makes the BOTTOM of the flower
             * sit exactly at that location.
             */

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


            /* ==================================
               FLOWER HTML
            =================================== */

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


            flowerLayer.appendChild(
                flower
            );


            /* ==================================
               SPARKLE
            =================================== */

            createSparkle(
                safeX,
                safeY - 12
            );


            /* ==================================
               COUNTER
            =================================== */

            flowerCount++;

            countNumber.textContent =
                flowerCount;


            /* ==================================
               BLOOM ANIMATION
            =================================== */

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


            /* ==================================
               HIDE TAP HINT
            =================================== */

            if (flowerCount >= 1) {

                tapHint.style.opacity =
                    "0";

            }

        }


        /* ======================================
           CREATE SPARKLE
        ======================================= */

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


        /* ======================================
           PLANT ONLY ON THE GROUND
        ======================================= */

        plantZone.addEventListener(
            "pointerdown",
            (event) => {

                /*
                 * Ignore right mouse button.
                 */

                if (
                    event.pointerType === "mouse" &&
                    event.button !== 0
                ) {

                    return;

                }


                /*
                 * Prevent scrolling or
                 * accidental browser gestures
                 * while planting.
                 */

                event.preventDefault();


                createTulip(
                    event.clientX,
                    event.clientY
                );

            }
        );


        /* ======================================
           CLEAR GARDEN
        ======================================= */

        clearBtn.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                /*
                 * Remove all flowers.
                 */

                flowerLayer.innerHTML =
                    "";


                /*
                 * Reset counter.
                 */

                flowerCount = 0;

                countNumber.textContent =
                    "0";


                /*
                 * Show the hint again.
                 */

                tapHint.style.opacity =
                    "1";

            }
        );


        /* ======================================
           KEYBOARD SUPPORT
        ======================================= */

        document.addEventListener(
            "keydown",
            (event) => {

                /*
                 * ESC = clear garden
                 */

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


                /*
                 * ENTER = enter garden
                 * while intro is visible
                 */

                if (
                    event.key === "Enter" &&
                    !introScreen.classList.contains(
                        "hidden"
                    )
                ) {

                    enterGarden.click();

                }

            }
        );


        /* ======================================
           PREVENT CONTEXT MENU
        ======================================= */

        garden.addEventListener(
            "contextmenu",
            (event) => {

                event.preventDefault();

            }
        );


    }
);
