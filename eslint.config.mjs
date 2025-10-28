import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
    ...nextVitals,
    globalIgnores([
                      '.next/**',
                      'out/**',
                      'build/**',
                      'next-env.d.ts',
    ]),
    {
        rules: {
            "import/no-restricted-paths": ["error", {
                zones: [{
                    target: "./core",
                    from: "./lib",
                }, {
                    target: "./core",
                    from: "./pages",
                }, {
                    target: "./lib",
                    from: "./pages",
                }, {
                    target: "./components",
                    from: "./pages",
                }],
            }],
        },
    }
]);