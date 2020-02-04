import { GameScene } from './gameScene';
import { Scene } from './scene';
import { Anchor } from 'springroll';

export class TitleScene extends Scene
{
    constructor(game)
    {
        super(game);
    }

    start()
    {
        // a clickable label to cause a scene change
        const text = new createjs.Text("Click me!", "20px Arial", "#ffffff");
        text.x = 0;
        text.y = 0;

        text.addEventListener("click", () =>
        {
            // when the label is clicked, preload the game scene and then tell the app to switch scenes
            const nextScene = new GameScene(this.game);
            nextScene.preload().then(() =>
            {
                this.game.app.state.scene.value = nextScene;
            });
        });

        const topLeft = new Anchor({
            position: { x: 10, y: 10 },
            direction: { x: -1, y: -1 },
            callback: ({ x, y }) => {
                text.x = x;
                text.y = y;
            }
        });
        this.game.scaleManager.addEntity(topLeft);

        this.addChild(text);
    }
}