import { EventBus } from "./index";

const bus = new EventBus();

// 1. 订阅消息
const welcomeHandler = (name) => console.log(`Hello, ${name}!`);
bus.on("greet", welcomeHandler);

// 2. 发布消息
bus.emit("greet", "Gemini"); // 输出: Hello, Gemini!

// 3. 一次性订阅
bus.once("prize", (item) => console.log(`恭喜获得: ${item}`));
bus.emit("prize", "新款手机"); // 输出: 恭喜获得: 新款手机
bus.emit("prize", "新款电脑"); // (无输出，因为已销毁)

// 4. 取消订阅
bus.off("greet", welcomeHandler);
bus.emit("greet", "World"); // (无输出)
