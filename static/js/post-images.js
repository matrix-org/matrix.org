// Wraps post images with the lightbox markup (see sass/_lightbox.scss).
document.addEventListener('DOMContentLoaded', () => {
    let count = 0;

    document.querySelectorAll('.post-content img').forEach((img) => {
        // {{ figure() }} images already have their own framing.
        if (img.closest('figure')) {
            return;
        }

        count += 1;
        let id = `post-image-${count}`;

        let trigger = document.createElement('a');
        trigger.href = `#${id}`;
        trigger.className = 'lightbox-trigger';
        trigger.setAttribute('aria-label', 'Enlarge image');
        img.replaceWith(trigger);
        trigger.appendChild(img);

        let overlay = document.createElement('div');
        overlay.className = 'lightbox';
        overlay.id = id;
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-label', img.alt || 'Image');
        overlay.innerHTML = `
            <a href="#/" class="lightbox-backdrop" aria-label="Close"></a>
            <a href="#/" class="lightbox-close" aria-label="Close">&times;</a>
        `;

        let bigImg = document.createElement('img');
        bigImg.src = img.src;
        bigImg.alt = img.alt;
        overlay.appendChild(bigImg);

        document.body.appendChild(overlay);
    });
});
