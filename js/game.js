(function () {
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
          if (this.snake.direction != 'right') {
            this.snake.direction = 'left';
          }
          break;
        case 38:
          if (this.snake.direction != "bottom") {
            this.snake.direction = 'top';
          }
          break;
        case 39:
          if (this.snake.direction != "left") {
            this.snake.direction = 'right';
          }
          break;
        case 40:
          if (this.snake.direction != "top") {
            this.snake.direction = 'bottom';
          }
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
        // alert('记录' + score.innerHTML)
        clearInterval(timerId)
      }
      for (var i = 4; i < this.snake.body.length; i++) {
        if (this.snake.body[0].x == this.snake.body[i].x && this.snake.body[0].y == this.snake.body[i].y) {
          clearInterval(timerId);  // 清除定时器，
          alert("傻子！你怎么能吃自己呢？");
        }
      }

    }.bind(that), 150)
  }

  window.Game = Game
})()

