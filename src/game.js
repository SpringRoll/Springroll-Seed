import { GAMEPLAY } from './constants';

import { TitleScene } from './scenes/title';
import { Property, SafeScaleManager, Application } from 'springroll';
import * as PIXI from 'pixi.js';
import { sound } from '@pixi/sound';

export class Game
{
    constructor(width, height)
    {
        this.emitter = new PIXI.EventEmitter();
        this.width = width;
        this.height = height;
        
        this.pixi = new PIXI.Application();
        (async () => 
        {
            await this.pixi.init(
            {
                width,
                height,
                autoResize: true
            });

            document.getElementById('content').appendChild(this.pixi.canvas);
            
            this.application = new Application(
            {
                // This feature list matches the Springroll states subscribed to below
                // Note: features will only work if the Container environment also supports controls for that feature.
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

            this.resize = this.resize.bind(this);
            this.scaleManager = new SafeScaleManager({width, height, safeWidth: 1024, safeHeight: 660, callback: this.resize});
            
            // Listen for container events from the application.
            this.application.state.ready.subscribe(this.onApplicationReady.bind(this));
            this.application.state.pause.subscribe(this.onApplicationPause.bind(this));

            this.application.state.captionsMuted.subscribe(result =>
            {
                console.log('captionsMuted: ', result);
            });
    
            this.application.state.soundVolume.subscribe(this.onMainVolumeChange.bind(this));
            this.application.state.voVolume.subscribe(result =>
            {
                console.log('voVolume: ', result);
            });
            this.application.state.musicVolume.subscribe(result =>
            {
                    console.log('musicVolume: ', result);
            });
            this.application.state.sfxVolume.subscribe((value) =>
            {
                //Check to see if sound exists in the cache before changing its volume
                if(PIXI.Assets.cache.has('bounce'))
                {
                    PIXI.Assets.get('bounce').sound.volume = value;
                }
                
            });

            // add a extra state property for storying the current scene. Whenever the scene is changed, this class
            // will swap out the container attached to the stage
            this.application.state.scene = new Property(null);
            this.application.state.scene.subscribe(this.onChangeScene.bind(this));
    
            // wait for the app to be ready, then set the new scene
            this.application.state.ready.subscribe(() =>
            {
                this.application.state.scene.value = new TitleScene(this);
            });

            // Dispatch a ready event after initializing the app
            this.emitter.emit('ready');
        })();
    }

    run()
    {
        // to start the game up, register the update loop
        this.pixi.ticker.add(this.update.bind(this));
    }

    onApplicationReady() 
    {
        console.log('The app is ready. All plugins have finished their setup and preload calls');
    }

    onApplicationPause(isPaused) 
    {
        console.log('Is the game paused?', isPaused);
        this.isPaused = isPaused;
    }

    onMainVolumeChange(value) 
    {
        sound.volumeAll = value;
    }


    onChangeScene(newScene, oldScene)
    {
        this.currentScene = null;
        // when a new scene is set, add it's container, then start it up
        newScene.preload().then(() =>
        {
            this.pixi.stage.addChild(newScene);
            this.currentScene = newScene;
            newScene.start();

            // oh, and don't forget to remove the old scene
            this.pixi.stage.removeChild(oldScene);
        });
    }

    update(deltaTime)
    {
        // if the game is paused, or there isn't a scene, we can skip rendering/updates
        if (this.isPaused || this.application.state.scene.value === null)
        {
            return;
        }

        if (this.currentScene)
        {
            this.currentScene.update(deltaTime);
        }

    }

    resize({ scaleRatio })
    {
        // -- PIXI -- //
        const renderer = this.pixi.renderer;

        renderer.view.canvas.style.width = `${GAMEPLAY.WIDTH * scaleRatio}px`;
        renderer.view.canvas.style.height = `${GAMEPLAY.HEIGHT * scaleRatio}px`;
    }
}
