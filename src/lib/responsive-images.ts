import variants from "@/data/image-variants.json";

export function responsiveImage(src: string, sizes: string) {
  const image = (variants as Record<string, { src: string; srcSet: string; width: number; height: number }>)[src];
  return image ? { ...image, sizes } : { src };
}
