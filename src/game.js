import * as Springroll from 'springroll';

import { TitleScene } from './scenes/title';
import { Property } from 'springroll';

export class Game
{
    constructor(width, height)
    {
        this.width = width;
        this.height = height;
        this.app = new Springroll.Application(
        {
            features:
            {
                sfx: true
            }
        });

        this.pixi = new PIXI.Application({ width, height });
        document.getElementById('content').appendChild(this.pixi.view);

        // Subscribe to required springroll States.
        this.app.state.pause.subscribe((value) =>
        {
            this.isPaused = value;
        });

        this.app.state.soundVolume.subscribe((value) =>
        {
            PIXI.sound.volumeAll = value;
        });

        this.app.state.sfxVolume.subscribe((value) =>
        {
            // this will break if done before sounds are loaded.
            // in a full game this should be handled gracefully.
            PIXI.loader.resources['bounce'].sound.volume = value;
        }); 

        // add a extra state property for storying the current scene. Whenever the scene is changed, this class
        // will swap out the container attached to the stage
        this.app.state.scene = new Property(null);
        this.app.state.scene.subscribe(this.onChangeScene.bind(this));

        // wait for the app to be ready, then set the new scene
        this.app.state.ready.subscribe(() => {
          this.app.state.scene.value = new TitleScene(this);
        });
    }

    run() {
      // to start the game up, register the update loop
      this.pixi.ticker.add(this.update.bind(this));
    }

    onChangeScene(newScene, oldScene) {
      // when a new scene is set, add it's container, then start it up
      this.pixi.stage.addChild(newScene);
      newScene.start();

      // oh, and don't forget to remove the old scene
      this.pixi.stage.removeChild(oldScene);
    }

    update(deltaTime)
    {
        // if the game is paused, or there isn't a scene, we can skip rendering/updates  
        if (this.isPaused || this.app.state.scene.value === null)
        {
            return;
        }

        this.app.state.scene.value.update(deltaTime);
    }
}
