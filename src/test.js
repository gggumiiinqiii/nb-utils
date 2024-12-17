function urLucky(drawCount) {
    const jsonQuiz = [
        { "username": "张三", "times": 24 },
        { "username": "李四", "times": 1 },
        { "username": "王二", "times": 6 },
        { "username": "麻子", "times": 9 }
    ];
  
    // 计算总权重
    const totalTimes = jsonQuiz.reduce((sum, person) => sum + person.times, 0);
  
    // 创建权重分布数组
    const weightedPool = [];
    jsonQuiz.forEach(person => {
        const weight = person.times / totalTimes;
        for (let i = 0; i < Math.round(weight * 10000); i++) {
            weightedPool.push(person.username);
        }
    });
    console.log(weightedPool.length)
    // 抽奖
    const winners = new Set();
    while (winners.size < drawCount) {
        const randomIndex = Math.floor(Math.random() * weightedPool.length);
        winners.add(weightedPool[randomIndex]);
    }
  
    return Array.from(winners);
  }
  urLucky(2)