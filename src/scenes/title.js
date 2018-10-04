import { GameScene } from './gameScene';
import { Scene } from './scene';

export class TitleScene extends Scene
{
    constructor(game)
    {
        super(game);
    }

    start()
    {
        // a clickable label to cause a scene change
        let text = new createjs.Text("Click me!", "20px Arial", "#ffffff");

        text.addEventListener("click", () =>
        {
            // when the label is clicked, preload the game scene and then tell the app to switch scenes
            const nextScene = new GameScene(this.game);
            nextScene.preload().then(() =>
            {
                this.game.app.state.scene.value = nextScene;
            });
        });

        this.addChild(text);
    }
}