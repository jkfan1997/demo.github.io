// ------------------tools---------
(function (window, undefined) {
  var tools = {
    getRandom: function (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  }
  window.tools = tools
})(window, undefined)

  ; (function (window) {
    function Parent(options) {
      options = options || {}
      this.width = options.width || 20;
      this.height = options.height || 20;
    }
    window.Parent = Parent
  })(window, undefined)

  // -----------------food----------
  ; (function (window, undefined) {
    var elements = []

    function Food(options) {
      options = options || {}
      this.color = options.backgroundColor || 'green'
      // this.width = options.width || 20;
      // this.height = options.height || 20;
      Parent.call(this, options)
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
    window.Food = Food
  })(window, undefined)

  // ---------------snake--------------
  ; (function (window, undefined) {
    var a = 0
    var elements = []
    function Snake(options) {
      options = options || {}
      // this.width = options.width || 20;
      // this.height = options.height || 20;
      Parent.call(this, options)
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
    var score = document.querySelector('.score')
    function scr() {
      a++
      score.innerHTML = parseInt(score.innerHTML) + 1
    }


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
  })(window, undefined);

// -------------------game---------------------
; (function (window, undefined) {
  var that
  function Game(map) {

    this.food = new Food()

    this.snake = new Snake({ direction: 'bottom' })
    this.map = map
    that = this
  }

  Game.prototype.start = function () {

    this.food.init(this.map)
    this.snake.init(this.map)
    runSnake()
    bindKey()

  }
  function bindKey() {
    document.addEventListener('keydown', function (e) {
      switch (e.keyCode) {
        case 37:
          this.snake.direction = 'left';
          break;
        case 38:
          this.snake.direction = 'top';
          break;
        case 39:
          this.snake.direction = 'right';
          break;
        case 40:
          this.snake.direction = 'bottom';
          break;

      }
    }.bind(that))
  }
  function runSnake() {
    var timerId = setInterval(function () {
      if (this.snake.body[0].x > 0 && this.snake.body[0].x < this.map.offsetWidth / that.snake.width && that.snake.body[0].y > 0 && that.snake.body[0].y < that.map.offsetHeight / that.snake.width) {
        this.snake.move(this.food, this.map)
        this.snake.init(this.map)

      } else {
        alert('记录' + score.innerHTML)


        clearInterval(timerId)
      }

    }.bind(that), 150)
  }

  window.Game = Game
})(window, undefined)

  //-----------------main-------------------------
  ; (function (window, undefined) {
    var map = document.querySelector('.map')
    var game = new Game(map)

    game.start()
  })(window, undefined)
