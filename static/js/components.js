class YoutubePlayer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = `
            .youtube_placeholder {
                display: flex;
                flex-direction: column;
                justify-content: center;
                aspect-ratio: 16/9;
                width: 100%;
                background-color: #333;
            }

            .youtube_placeholder > div {
                display: flex;
                flex-direction: column;
                color: #fff;
                padding: 1.5rem;
                gap: 1.5rem;
            }

            img {
                margin-inline: auto;
            }

            p {
                max-width: 30rem;
                text-align: center;
                margin-inline: auto;
                color: #fff;
            }

            a.button,
            button {
                background-color: #fff;
                border: 1px solid transparent;
                border-radius: 9999px;
                color: #000;
                cursor: pointer;
                font-size: 1rem;
                min-width: fit-content;
                max-width: fit-content;
                margin-inline: 4px;
                padding: 0.5rem 1rem;
                line-height: 1.5rem;
                text-decoration: none;
            }

            a.button:hover,
            button:hover {
                border: 1px solid #fff;
                color: #fff;
                background-color: #333;
            }

            .button-group {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }

            .button-group > * {
                margin: 4px;
            }

            iframe {
                aspect-ratio: 16/9;
                width: 100%;
            }
            `;
        shadow.appendChild(style);

        const placeholder = document.createElement("div");
        placeholder.setAttribute("class", "youtube_placeholder");

        if (localStorage.getItem("ytConsent") ?? false) {
            shadow.appendChild(placeholder);
            this.loadPlayer();
        } else {
            const placeholDiv = document.createElement("div");

            const ytLogo = document.createElement("img");
            ytLogo.setAttribute("src", "/assets/youtube-red.svg");
            ytLogo.setAttribute("width", 159);
            ytLogo.setAttribute("height", 110);
            ytLogo.setAttribute("alt", "YouTube logo");
            placeholDiv.appendChild(ytLogo);

            const disclaimer = document.createElement("p");
            disclaimer.textContent = "Clicking the \"Load Player\" button will load the YouTube Player and its cookies.";
            placeholDiv.appendChild(disclaimer);

            const buttonGroup = document.createElement("div");
            buttonGroup.classList.add("button-group");

            const consentButton = document.createElement("button");
            consentButton.textContent = "Load Player";
            buttonGroup.appendChild(consentButton);
            consentButton.addEventListener("click", () => {
                window.localStorage.setItem("ytConsent", true);
                this.dispatchEvent(new CustomEvent("ytConsentChanged", { bubbles: true }));
            });

            const videoId = this.getAttribute("video-id")
            const openInYoutube = document.createElement("a");
            openInYoutube.textContent = "Open in Youtube";
            openInYoutube.classList.add("button");
            openInYoutube.setAttribute(
                "href",
                `https://youtube.com/watch?v=${videoId}`
            );
            openInYoutube.setAttribute("target", "_blank");
            buttonGroup.appendChild(openInYoutube);

            placeholDiv.appendChild(buttonGroup);
            placeholder.appendChild(placeholDiv);
            shadow.appendChild(placeholder);
        }

        window.addEventListener("ytConsentChanged", () => {
            if (localStorage.getItem("ytConsent") ?? false) {
                this.loadPlayer();
            }
        });
    }


    loadPlayer() {
        const videoId = this.getAttribute("video-id")
        const innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoId + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

        for (const child of this.shadowRoot.children) {
            if (child.classList.contains("youtube_placeholder")) {
                child.replaceChildren();
                child.innerHTML = innerHTML;
            }
        }
    }
}

customElements.define("youtube-player", YoutubePlayer);
