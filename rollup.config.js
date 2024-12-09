
import resolve from '@rollup/plugin-node-resolve';
//import terser from '@rollup/plugin-terser';
const buildOptions = {
  input: ["test.js"],
  output: [
    {
      // 产物输出目录
      dir: "dist/es",
      // 产物格式
      format: "esm",
    },
    {
      dir: "dist/cjs",
      format: "cjs",
    },
  ],
  plugins: [
    resolve({
      modules: true
    }),
 //   terser()
  ]
};
export default buildOptions;
