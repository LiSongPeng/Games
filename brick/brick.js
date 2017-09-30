(function (undefined) {
    var game = {
        ball: {
            x: 9,
            y: 16,
            XSpeed: 0,
            YSpeed: 0,
            pic: null,
        },
        timerId: 0,
        blocker: {
            x: 7,
            y: 17,
            pic: null,
        },
        bricks: new Array(new Array(20), new Array(20), new Array(20), new Array(20), new Array(20), new Array(20), new Array(20), new Array(20)),
        brickNum: 160,
        rowNum: 8,
        columNum: 20,
        brickSize: 24,
        timer: null,
        stage: null,
        init: function () {
            var start = document.querySelector('#start');
            var restart = document.querySelector('#restart');
            start.onclick = function () {
                if (start.innerText == '开始') {
                    game.start();
                    start.innerText = '暂停';
                } else {
                    game.pause();
                    start.innerText = '开始';
                }
            }
            restart.onclick = function () {
                game.restart();
            }
            this.stage = new createjs.Stage('canvas');
            //绘制背景面板
            var each;
            for (i = 0; i < this.columNum; i++) {
                for (j = 0; j < this.columNum; j++) {
                    each = new createjs.Shape();
                    each.graphics.beginFill('gray').drawRect(j * (this.brickSize + 1), i * (this.brickSize + 1), this.brickSize, this.brickSize);
                    this.stage.addChild(each);
                }
            }
            for (i = 0; i < this.rowNum; i++) {
                for (j = 0; j < this.columNum; j++) {
                    each = new createjs.Shape();
                    each.graphics.beginFill('blue').drawRect(j * (this.brickSize + 1), i * (this.brickSize + 1), this.brickSize, this.brickSize);
                    this.bricks[i][j] = each;
                    this.stage.addChild(each);
                }
            }
            each = new createjs.Shape();
            each.graphics.beginFill('red').drawRect(9 * (this.brickSize + 1), 16 * (this.brickSize + 1), this.brickSize, this.brickSize);
            this.ball.pic = each;
            this.ball.XSpeed = -1;
            this.ball.YSpeed = -1;
            this.ball.x = 9;
            this.ball.y = 16;
            this.stage.addChild(each);
            each = new createjs.Shape();
            each.graphics.beginFill('red').drawRect(7 * (this.brickSize + 1), 17 * (this.brickSize + 1), 6 * (this.brickSize + 1), this.brickSize);
            this.stage.addChild(each);
            this.blocker.pic = each;
            this.blocker.x = 7;
            this.blocker.y = 17;
            this.brickNum=this.rowNum*this.columNum;
            this.stage.update();
        },
        start: function () {
            document.onkeydown = function (event) {
                if (event.keyCode == 37) {//左键被按下
                    game.blockerToLeft();
                } else if (event.keyCode == 39) {//右键被按下
                    game.blockerToRight();
                }
            }
            this.timerId = window.setInterval(game.ballMove, 100);
        },
        win:function () {
          alert('你赢了');
          this.restart();
        },
        ballMove: function () {
            game.ball.x += game.ball.XSpeed;
            game.ball.pic.x += game.ball.XSpeed * (game.brickSize + 1);
            if (game.ball.x == 0 || game.ball.x == 19)
                game.ball.XSpeed = -game.ball.XSpeed;
            game.ball.y += game.ball.YSpeed;
            game.ball.pic.y += game.ball.YSpeed * (game.brickSize + 1);
            game.stage.update();
            var nextX = game.ball.x + game.ball.XSpeed;
            var nextY = game.ball.y + game.ball.YSpeed;
            if ((nextY >= 0 && nextY < 8) && (nextX >= 0 && nextX < 20))
                if (game.bricks[nextY][nextX] != null) {
                    game.stage.removeChild(game.bricks[nextY][nextX]);
                    game.bricks[nextY][nextX] = null;
                    game.ball.YSpeed = -game.ball.YSpeed;
                    game.stage.update();
                    if(--this.brickNum==0){
                        game.win();
                    }
                }
            if (game.ball.x >= game.blocker.x && game.ball.x <= game.blocker.x + 5 && game.ball.y + 1 == game.blocker.y) {
                game.ball.YSpeed = -game.ball.YSpeed;
            }
            if (game.ball.y == 0)
                game.ball.YSpeed = -game.ball.YSpeed;
            if (game.ball.y == 20) {
                alert('你输了');
                game.restart();
            }
        },
        pause: function () {
            document.onkeydown = null;
            window.clearInterval(this.timerId);
        },
        restart: function () {
            this.stage.removeAllChildren();
            this.stage.update();
            this.init();
        },
        blockerToLeft: function () {
            if (this.blocker.x == 0)
                return;
            this.blocker.x--;
            this.blocker.pic.x -= this.brickSize + 1;
            this.stage.update();
        },
        blockerToRight: function () {
            if (this.blocker.x == 14)
                return;
            this.blocker.x++;
            this.blocker.pic.x += this.brickSize + 1;
            this.stage.update();
        },
    };
    game.init();
}(undefined))
