/// <reference types="vite/client" />

/* vite-imagetools: allow importing images with query params like ?w=500&format=webp */
declare module '*?w=*&format=webp' {
  const src: string;
  export default src;
}
declare module '*?w=*&h=*&fit=cover&format=webp' {
  const src: string;
  export default src;
}
