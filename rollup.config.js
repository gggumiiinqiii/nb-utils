import resolve from "@rollup/plugin-node-resolve";

const buildOptions = {
  input: ["src/index.js"],
  output: [
    {
      dir: "dist/es",
      format: "esm",
    },
    {
      dir: "dist/cjs",
      format: "cjs",
    },
  ],
  plugins: [
    resolve({
      modules: true,
    }),
  ],
};
export default buildOptions;
