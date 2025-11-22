import { readdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "dist",
        emptyOutDir: false,
        sourcemap: true,
        lib: {
            entry: "src/MahjongScoreService/MahjongScoreService.ts",
            name: "MahjongScoreService",
            formats: ['es', 'cjs'],
            fileName: (format) => `mahjong-score-service.${format}.js`,            
        },
        rollupOptions: {
            input: "src/MahjongScoreService/MahjongScoreService.ts",
            plugins: [
                {
                    name: "clean-dist",
                    async buildStart() {
                        const outDir = resolve(__dirname, "dist");
                        try {
                            const files = await readdir(outDir);
                            for (const file of files) {
                                if (file !== 'types') {
                                    await rm(resolve(outDir, file), { recursive: true, force: true });
                                }
                            }
                        }catch(_) {
                            // ignore
                        }
                    } 
                }
            ]
        }
    },
    resolve: {
        alias: {
            "@": "/src",
        },
    }
})