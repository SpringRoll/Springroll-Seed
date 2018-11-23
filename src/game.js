import * as Springroll from 'springroll';

import { TitleScene } from './scenes/title';
import { GameScene } from './scenes/gameScene';
import { Property, ScaleManager } from 'springroll';
import { GAMEPLAY } from './constants';

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

        this.resize = this.resize.bind(this);
        this.scaleManager = new ScaleManager(this.resize);

        this.stage = new createjs.Stage('stage');

        // Subscribe to required springroll States.
        this.app.state.pause.subscribe((value) =>
        {
            this.isPaused = value;
        });

        this.app.state.soundVolume.subscribe((value) =>
        {
            // set master volume
            createjs.Sound.volume = value;
        });

        this.sfxVolume = 1; 
        this.app.state.sfxVolume.subscribe((value) =>
        {
            this.sfxVolume = value;
        });

        // add an extra state property for storying the current scene. Whenever the scene is changed, this class
        // will swap out the container attached to the stage
        this.app.state.scene = new Property(null);
        this.app.state.scene.subscribe(this.onChangeScene.bind(this));

        // wait for the app to be ready, then set the new scene
        this.app.state.ready.subscribe(() =>
        {
            this.app.state.scene.value = new TitleScene(this);
        });

        // Set Ticker
        createjs.Ticker.framerate = 60;
        createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;

        // Set Sound settings
        createjs.Sound.registerPlugins([createjs.WebAudioPlugin]);
        createjs.Sound.alternateExtensions = ["mp3"];
    }

    run()
    {
        // to start the game up, register the update loop
        createjs.Ticker.addEventListener("tick", this.update.bind(this));
    }

    onChangeScene(newScene, oldScene)
    {
        // when a new scene is set, add it's container, then start it up
        this.stage.addChild(newScene);
        newScene.start();
        
        // oh, and don't forget to remove the old scene
        if (oldScene)
        {
            oldScene.stop();
            this.stage.removeChild(oldScene);
        }
    }

    update(tick)
    {
        this.stage.update();
        // if the game is paused, or there isn't a scene, we can skip rendering/updates  
        if (this.isPaused || this.app.state.scene.value === null)
        {
            return;
        }

        this.app.state.scene.value.update(tick.delta / 1000);
    }

    resize({ width, height })
    {
        var scale = Math.min(width / GAMEPLAY.WIDTH, height / GAMEPLAY.HEIGHT);
        
        this.stage.canvas.setAttribute('style',
            ' -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1);' +
            ' -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');' +
            ' transform-origin: top left;'
        );
    }
}