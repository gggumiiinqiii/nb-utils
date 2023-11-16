
import resolve from '@rollup/plugin-node-resolve';

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
    })
  ]
};
export default buildOptions;
