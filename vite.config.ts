import path from "path";
import {type UserConfig} from "vite";

export default {
    build: {
        assetsDir: "assets",
        outDir: "../dist",
        copyPublicDir: true,
        sourcemap: true
    },
    publicDir: "static",
    root: "src",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    }

} satisfies UserConfig;