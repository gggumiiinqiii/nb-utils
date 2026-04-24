class EventBus {
  constructor() {
    // 使用Object.create(null)创建一个纯净的对象，用于存储事件及其回调队列
    this.events = Object.create(null);
  }
  /**
   * 订阅事件
   * @param {*} type
   * @param {*} handler
   */
  on(type, handler) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(handler);
  }
  /**
   * 发布事件
   * @param {*} type
   * @param  {...any} args
   */
  emit(type, ...args) {
    if (this.events[type]) {
      const handlers = [...this.events[type]];
      handlers.forEach((handler) => handler(...args));
    }
  }
  /**
   * 取消订阅
   * @param {*} type
   * @param {*} handler
   * @returns
   */
  off(type, handler) {
    if (!this.events[type]) return;
    if (!handler) {
      // 如果没传具体的 handler，直接清空该事件的所有订阅
      this.events[tpye] = [];
    } else {
      // 过滤掉匹配的函数
      this.events[type] = this.events[type].filter((h) => h !== handler);
    }
  }
  /**
   * 一次性订阅
   * @param {string} type 事件名称
   * @param {Function} handler 回调函数
   */
  once(type, handler) {
    // 包装一个函数，执行后立即销毁
    const wrapper = (...args) => {
      handler(...args);
      this.off(type, wrapper);
    };
    this.on(type, wrapper);
  }
}
export { EventBus };
