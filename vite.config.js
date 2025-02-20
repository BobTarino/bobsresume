import { defineConfig } from "vite";

export default defineConfig({
    base: "./",  /* base helps locate assets */
    build: {
        minify: "terser", /* makes code smaller since kaboom has bug*/
    }


})