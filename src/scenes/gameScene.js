import { Scene } from "./scene";
import { Ball } from "../gameobjects/ball";
import { GameCache } from "../cache";

export class GameScene extends Scene
{
    constructor(game)
    {
        super(game);
    }

    preload()
    {
        // load necessary objects 
        const queue = new createjs.LoadQueue();
        queue.installPlugin(createjs.Sound); // <-- SoundJS has a cache built in.;
        queue.loadFile({ id: 'ball', src: './assets/Ball.png' });
        queue.loadFile({ id: 'background', src: './assets/BG1320x780-2.png' });
        queue.loadFile({ id: 'bounce', src: './assets/bounce.ogg' });

        queue.on('fileload', (event) => GameCache.onLoad(event));

        const loadComplete = new Promise((resolve, reject) =>
        {
            queue.on("complete", resolve);
        });

        queue.load();
        return loadComplete;
    }

    start()
    {
        this.background = new createjs.Bitmap(GameCache.images["background"]);
        this.addChild(this.background);

        // add some items to this scene
        this.ball = new Ball({ game: this.game,  x: (this.game.width / 4) * 3, y: this.game.height / 2 });
        this.addChild(this.ball);

        this.ball2 = new Ball({ game: this.game, x: this.game.width / 4, y: this.game.height * 0.25 });
        this.addChild(this.ball2);
    }

    update(deltaTime)
    {
        // bounce the balls
        this.ball.update(deltaTime);
        this.ball2.update(deltaTime);
    }
}