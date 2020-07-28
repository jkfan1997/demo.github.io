(function () {
  var elements = []

  function Food(options) {
    options = options || {}
    this.color = options.backgroundColor || 'green'
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.x = options.x || 0;
    this.y = options.y || 0;
  }
  // 渲染样式
  Food.prototype.init = function (map) {
    remove()
   
    // 动态创建div 页面上显示的食物
    var div = document.createElement('div')
    map.appendChild(div)

    elements.push(div)
    // 随机设置食物的x和y的值
    this.x = tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width
    this.y = tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height
    // 设置食物样式
    div.style.position = 'absolute'
    div.style.left = this.x + 'px'
    div.style.top = this.y + 'px'
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.backgroundColor = this.color;
  }

  function remove() {
    for (var i = elements.length - 1; i >= 0; i--) {
      // 删除div
      elements[i].parentNode.removeChild(elements[i])
      // 删除数组元素
      elements.splice(i, 1)
    }
  }
  //把Food构造函数攘外不可以访问
  window.Food=Food
})()
// var map = document.querySelector('.map')
// setInterval(() => {
// console.log(elements);
// var food = new Food()
// food.init(map)
  // }, 500)

