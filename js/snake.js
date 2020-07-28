(function () {
  var a = 0
  var elements = []
  function Snake(options) {
    options = options || {}
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.direction = options.direction || 'right';
    this.body = [
      { x: 3, y: 2, color: 'red' },
      { x: 2, y: 2, color: 'blue' },
      { x: 1, y: 2, color: 'blue' },
    ]
  }

  Snake.prototype.init = function (map) {
    for (var i = 0; i < this.body.length; i++) {

      var div = document.createElement('div')
      elements.push(div)
      map.appendChild(div)
      div.style.position = 'absolute'
      div.style.width = this.width + 'px'
      div.style.height = this.height + 'px'
      div.style.left = this.body[i].x * this.width + 'px'
      div.style.top = this.body[i].y * this.height + 'px'
      div.style.backgroundColor = this.body[i].color
    }
  }
  // 控制蛇的移动
  Snake.prototype.move = function (food, map) {
    remove()

    for (var i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x
      this.body[i].y = this.body[i - 1].y
    }
    var head = this.body[0]
    switch (this.direction) {
      case 'right':
        head.x += 1
        break;
      case 'left':
        head.x -= 1
        break;
      case 'top':
        head.y -= 1
        break;
      case 'bottom':
        head.y += 1
        break;
    }

    var headX = head.x * this.width
    var headY = head.y * this.height
    if (headX === food.x && headY === food.y) {
      food.init(map)
      scr()


      var last = this.body[this.body.length - 1]
      this.body.push({
        x: last.x,
        y: last.y,
        color: last.color
      })
    }
  }
  var score=document.querySelector('.score')
  function scr() { a++
    score.innerHTML = parseInt(score.innerHTML) + 1 }


  function remove() {
    for (var i = elements.length - 1; i >= 0; i--) {
      // 删除div
      elements[i].parentNode.removeChild(elements[i])
      // 删除数组元素
      elements.splice(i, 1)
    }
  }

  window.Snake = Snake
  window.score = score
})()
// var snake=new Snake
// snake.init(map)