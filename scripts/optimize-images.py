"""Generate responsive WebP assets without modifying the source images. Requires Pillow."""
import json
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
manifest = {}
original_bytes = generated_bytes = 0
for folder in ['previews', 'videos', 'profile']:
    for source in sorted((root / 'public/images' / folder).glob('*')):
        if source.suffix.lower() not in ['.jpg', '.jpeg', '.png', '.webp']:
            continue
        with Image.open(source) as raw:
            image = ImageOps.exif_transpose(raw).convert('RGB')
            widths = sorted(set(min(image.width, width) for width in [480, 960, 1440]))
            entries = []
            for width in widths:
                height = round(image.height * width / image.width)
                target = root / 'public/images/optimized' / folder / f'{source.stem}-{width}.webp'
                target.parent.mkdir(parents=True, exist_ok=True)
                image.resize((width, height), Image.Resampling.LANCZOS).save(target, 'WEBP', quality=82, method=6)
                entries.append((width, height, '/' + target.relative_to(root / 'public').as_posix(), target.stat().st_size))
            width, height, url, size = entries[-1]
            manifest['/' + source.relative_to(root / 'public').as_posix()] = {
                'src': url, 'width': width, 'height': height,
                'srcSet': ', '.join(f'{url} {width}w' for width, _, url, _ in entries)
            }
            original_bytes += source.stat().st_size
            generated_bytes += size
(root / 'src/data/image-variants.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf8')
print(json.dumps({'images':len(manifest), 'original_bytes':original_bytes, 'largest_webp_bytes':generated_bytes, 'reduction_percent':round(100*(1-generated_bytes/original_bytes),1)}))
