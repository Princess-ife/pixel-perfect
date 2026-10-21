Photos, project previews and video thumbnails use generated responsive WebP images, preserving the original assets and existing crops/layout. The Open Graph JPEG and brand logos remain separate.

Run `python scripts/optimize-images.py` after adding or replacing an image in `public/images/previews`, `public/images/videos` or `public/images/profile`. Requires Python and Pillow. Commit the generated `public/images/optimized` files and `src/data/image-variants.json` with the source change; deployment does not require Python.

The initial pass covers 25 images. Source files total 3,727,714 bytes; the largest WebP variants total 1,746,728 bytes (53.1% smaller). Actual transfer depends on viewport and pixel density. Smaller variants are available at up to 480 and 960 pixels; the maximum width is 1440 pixels.

Image dimensions reserve space. Below-fold images load lazily and decode asynchronously; the hero portrait loads eagerly with high priority. New assets absent from the manifest retain their original URL until regenerated.
