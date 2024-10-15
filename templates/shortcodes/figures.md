# How to use Figures

## User Notes

### `figure` - Show an image with a caption

For example use it like this:

```text
{{
    figure(
        img="/blog/img/IMG_1747.jpg",
        caption="The Matrix Conference 2024"
    )
}}
```

if in a caption it is fine if `>` only is used at the opening curlybraces.

### `figureGallery` - Show multiple images with captions next to each other

Due to objects not being allowed we have an images array containing the img sources and caption array containing the captions.
The expectation is that they are in the same order.

For example use it like this:

```text
{{
    figureGallery(
        images=[
            "/blog/img/IMG_1747.jpg",
            "/blog/img/IMG_1993-2.jpg"
        ],
        captions=[
            "The Matrix Conference 2024",
            "Thank you to everyone!"
        ]
    )
}}
```

if in a caption it is fine if `>` only is used at the opening curlybraces.

### `figureVideo` - Show a video with a caption

For example use it like this:

```text
{{
    figureVideo(
        vid="/blog/img/video.mp4",
        caption="The Matrix Conference 2024"
    )
}}
```

## Developer Notes

### `figureGallery`

The for loop can not be indented. This leads to 2 code blocks instead.
