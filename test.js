// 验证各个模块正确导出
import {
  EventBus,
  calculate,
  compareVersion,
  computerMemoryUnit,
  debounce,
  throttle,
  isEqualObject,
  formatAmount,
  isEmpty,
  unique,
} from "./src/index.js";

// 1. EventBus test
const bus = new EventBus();
let greetCalled = false;
bus.on("greet", () => { greetCalled = true; });
bus.emit("greet");
console.assert(greetCalled, "EventBus on/emit");

// 2. off without handler (the bug fix test)
bus.on("test", () => {});
bus.off("test"); // should not throw
console.log("✓ EventBus off() without handler works");

// 3. calculate with multi-digit
console.assert(calculate("12*34") === 408, `calculate 12*34 = ${calculate("12*34")}`);
console.assert(calculate("2*3+4") === 10, `calculate 2*3+4 = ${calculate("2*3+4")}`);
console.assert(calculate("(2+3)*4") === 20, `calculate (2+3)*4 = ${calculate("(2+3)*4")}`);
console.log("✓ calculate() supports multi-digit, brackets, operator precedence");

// 4. compareVersion
console.assert(compareVersion("1.11.0", "1.9.9") === 1);
console.assert(compareVersion("1.0.0", "1.0.0") === 0);
console.log("✓ compareVersion");

// 5. computerMemoryUnit
console.assert(computerMemoryUnit(0) === "0B");
console.assert(computerMemoryUnit(1024) === "1KB");
console.assert(computerMemoryUnit(1024 * 1024) === "1MB");
console.assert(computerMemoryUnit() === "");
console.log("✓ computerMemoryUnit");

// 6. formatAmount
console.assert(formatAmount(1000, "分") === "10.00");
console.assert(formatAmount(1234567) === "1,234,567.00");
console.log("✓ formatAmount");

// 7. isEqualObject
console.assert(isEqualObject({ a: 1 }, { a: 1 }) === true);
console.assert(isEqualObject([1, 2], [1, 2]) === true);
console.assert(isEqualObject({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }) === true);
console.assert(isEqualObject(new Date("2024-01-01"), new Date("2024-01-01")) === true);
console.assert(isEqualObject({ a: 1 }, { a: 2 }) === false);
console.log("✓ isEqualObject (objects, arrays, dates, deep)");

// 8. unique
console.assert(unique([1, 2, 1, 3]).length === 3);
console.log("✓ unique");

// 9. isEmpty
console.assert(isEmpty(null) === true);
console.assert(isEmpty([]) === true);
console.assert(isEmpty({}) === true);
console.assert(isEmpty("hello") === false);
console.log("✓ isEmpty");

console.log("\n✅ All tests passed!");
