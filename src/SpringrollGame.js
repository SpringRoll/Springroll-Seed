import { Application, SafeScaleManager } from "springroll";
import { GAMEPLAY, SCENE } from "./constants";
import { TitleScene, GameScene } from "./scenes";
import { FactoryPlugin } from "./plugins";
import Phaser from 'phaser';

class SpringrollGame {
    constructor() {
        // Create a Phaser.Game.
        this.game = new Phaser.Game({
            type: Phaser.AUTO,
            width: GAMEPLAY.WIDTH,
            height: GAMEPLAY.HEIGHT,
            backgroundColor: '#000000',
            parent: 'gameTarget',
            plugins: {
                // FactoryPlugin is not necessary for Springroll, however it demonstrates
                // how to setup and install a Phaser.Plugin.
                global: [{ key: "FactoryPlugin", plugin: FactoryPlugin, start: true }]
            },
            loader: {
                // This allows Phaser to load assets from the local file system when running in Cordova
                localScheme: ['file://', 'capacitor://', 'cordova://', 'ionic://'],
            }
        });

        // Create a Springroll.SafeScaleManager.
        this.safeScale = new SafeScaleManager({
            width: GAMEPLAY.WIDTH,
            height: GAMEPLAY.HEIGHT,
            safeWidth: GAMEPLAY.SAFE_WIDTH,
            safeHeight: GAMEPLAY.SAFE_HEIGHT,
            callback: this.onWindowResize.bind(this)
        });

        // Add game scenes.
        this.game.scene.add(SCENE.GAME, GameScene);
        this.game.scene.add(SCENE.TITLE, TitleScene, true);


        // Instance of a Springroll.Application.
        // Flag any additional features. See https://github.com/SpringRoll/SpringRoll/tree/master/src
        this.application = new Application({
            features: {
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

        // Listen for container events from the application.
        this.application.state.ready.subscribe(this.onApplicationReady.bind(this));
        this.application.state.pause.subscribe(this.onApplicationPause.bind(this));

        this.application.state.captionsMuted.subscribe(result => {
            console.log('captionsMuted: ', result);
        });
        this.application.state.soundVolume.subscribe(this.onMainVolumeChange.bind(this));
        this.application.state.voVolume.subscribe(result => {
            console.log('voVolume: ', result);
        });
        this.application.state.musicVolume.subscribe(result => {
            console.log('musicVolume: ', result);
        });
        this.application.state.sfxVolume.subscribe(result => {
            console.log('sfxVolume: ', result);
        });
    }

    onApplicationReady() {
        console.log('The app is ready. All plugins have finished their setup and preload calls');
    }

    onApplicationPause(isPaused) {
        console.log('Is the game paused?', isPaused);
        if (isPaused) {
            this.game.scene.pause(SCENE.GAME);
        }
        else {
            this.game.scene.resume(SCENE.GAME);
        }
    }

    onMainVolumeChange(value) {
        this.game.sound.volume = value;
    }

    onWindowResize({ scaleRatio }) {
        this.game.canvas.style.width = `${GAMEPLAY.WIDTH * scaleRatio}px`;
        this.game.canvas.style.height = `${GAMEPLAY.HEIGHT * scaleRatio}px`;
    }
}

export const springrollGame = new SpringrollGame();