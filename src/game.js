import { TitleScene } from './scenes/title';
import { Property, SafeScaleManager, Application } from 'springroll';
import { GAMEPLAY } from './constants';
import createjs from 'createjs';

export class Game
{
    constructor(width, height)
    {
        this.width = width;
        this.height = height;
        this.sfxVolume = 1;

        this.app = new Application(
        {
            features:
            {
                captions: true,
                sound: true,
                soundVolume: true,
                vo: true,
                voVolume: true,
                music: true,
                musicVolume: true,
                sfx: true,
                sfxVolume: true,

            }
        });

        this.stage = new createjs.Stage('stage');

        this.resize = this.resize.bind(this);
        this.scaleManager = new SafeScaleManager({ 
            width,
            height,
            safeWidth: GAMEPLAY.SAFE_WIDTH,
            safeHeight: GAMEPLAY.SAFE_HEIGHT,
            callback: this.resize 
        });

        // Listen for container events from the application.
        // wait for the app to be ready, then set the new scene
        this.app.state.ready.subscribe(() =>
        {
            this.app.state.scene.value = new TitleScene(this);
        });

        this.app.state.pause.subscribe((value) =>
        {
            this.isPaused = value;
        });
        this.app.state.captionsMuted.subscribe(result => 
        {
            console.log('captionsMuted: ', result);
        });
        this.app.state.soundVolume.subscribe((value) =>
        {
            // set main volume
            createjs.Sound.volume = value;
        });
        this.app.state.voVolume.subscribe(result => 
        {
            console.log('voVolume: ', result);
        });
        this.app.state.musicVolume.subscribe(result => 
        {
            console.log('musicVolume: ', result);
        });
        this.app.state.sfxVolume.subscribe((value) =>
        {
            this.sfxVolume = value;
        });

        // add an extra state property for storying the current scene. Whenever the scene is changed, this class
        // will swap out the container attached to the stage
        this.app.state.scene = new Property(null);
        this.app.state.scene.subscribe(this.onChangeScene.bind(this));

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

    resize({ scaleRatio })
    {
        this.stage.canvas.style.width = `${GAMEPLAY.MAX_WIDTH * scaleRatio}px`
        this.stage.canvas.style.height = `${GAMEPLAY.MAX_HEIGHT * scaleRatio}px`
    }
}