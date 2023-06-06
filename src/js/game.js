import { Actor, Engine, Color, Label, TextAlign, Vector } from 'excalibur';

class Player extends Actor {
    constructor(x, y) {
        super({
            x: x,
            y: y,
            width: 20,
            height: 20,
            color: Color.Blue,
        });
    }
}

class Enemy extends Actor {
    constructor(x, y) {
        super({
            x: x,
            y: y,
            width: 20,
            height: 20,
            color: Color.Red,
        });
    }
}

class Game extends Engine {
    constructor() {
        super();
        this.width = 800;
        this.height = 400;

        this.player = new Player(100, 200);
        this.enemy = new Enemy(700, 200);
        this.scoreLabel = new Label({
            text: 'Score: 0',
            pos: new Vector(this.width - 100, 20)
        });
        this.scoreLabel.textAlign = TextAlign.Right;

        this.isGameOver = false;

        this.add(this.player);
        this.add(this.enemy);
        this.add(this.scoreLabel);
    }

    start() {
        this.on('loader', () => {
            const currentScore = parseInt(this.scoreLabel.text.substring(7));
            this.scoreLabel.text = `Score: ${currentScore + 1}`;

            if (this.player.collides(this.enemy)) {
                this.isGameOver = true;
                this.goToGameOverScreen();
            }

            if (this.isGameOver) {
                // Reset the game if it's already over
                this.resetGame();
            }
        });

        this.input.pointers.primary.on('down', (evt) => {
            if (!this.isGameOver) {
                this.player.pos.x = evt.x;
                this.player.pos.y = evt.y;
            }
        });
    }

    goToGameOverScreen() {
        this.clearActors();

        const gameOverLabel = new Label({
            text: 'Game Over!'
        })
        gameOverLabel.textAlign = TextAlign.Center;
        gameOverLabel.fontSize = 36;
        this.add(gameOverLabel);

        // Additional code for handling game over, such as displaying score or restarting the game
    }

    resetGame() {
        // Additional code to reset the game state, such as repositioning actors and resetting score
        this.isGameOver = false;
        // Reset player position
        this.player.pos.x = 100;
        this.player.pos.y = 200;
        // Reset score label
        this.scoreLabel.text = 'Score: 0';

        // Re-add actors to the game
        this.add(this.player);
        this.add(this.enemy);
        this.add(this.scoreLabel);
    }

    clearActors() {
        for (const actor of this.actors) {
            this.remove(actor);
        }
    }
}

const game = new Game();
game.start();