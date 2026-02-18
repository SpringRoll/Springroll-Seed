import { Application, SafeScaleManager } from "springroll";
import { GAMEPLAY, SCENE } from "./constants";
import { TitleScene, GameScene } from "./scenes";
import { FactoryPlugin } from "./plugins";
import Phaser from 'phaser';

let selectedLanguage;

const LANGUAGES = {
	ENGLISH: "en",
	SPANISH: "es",
};

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

        // Store safeScale in registry so scenes can access it
        this.game.registry.set('safeScale', this.safeScale);

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
        /*
        PlayOptions allows developers to pass values from the container environment to the SpringRoll environment. These values can contain any key value pairs the developer requires. This is typically how language selection is passed from the container to the game.
        */
        this.application.state.playOptions.subscribe(playOptions => 
        {
            console.log('New playOptions value set to', playOptions, selectedLanguage, LANGUAGES);

            this.getLanguage();
        });

        /*Using a default playOptions value for this demo. In a real container environment, the container would set playOptions and pass it into the game automatically. This is just for demonstration purposes to show how playOptions can be used to pass values from the container to the game.
        */
        this.application.state.playOptions.value = {
            language: LANGUAGES.ENGLISH
        };
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

    getLanguage() {
        if (selectedLanguage) {
            return selectedLanguage;
        }

        // Check for language param in query string first, this allows us to override the language for testing purposes without having to change the app state or reload the page with new play options. Example: ?language=es
        const urlParams = new URLSearchParams(window.location.search);

        const queryLanguage = urlParams.get("language"); 
        
        if (queryLanguage) {
            selectedLanguage = queryLanguage.toLowerCase();
            console.log(`Language set to ${selectedLanguage} from query string override!`);
            return selectedLanguage;
        }

        const playOptions = this.application.state.playOptions;
        const playOptionsLanguage = playOptions.value?.language;

        const availableLanguages = [LANGUAGES.ENGLISH, LANGUAGES.SPANISH];

        let language;

        if (playOptionsLanguage && playOptionsLanguage.includes(LANGUAGES.SPANISH) && availableLanguages.includes(LANGUAGES.SPANISH)) {
            language = LANGUAGES.SPANISH;
        } else {
            language = LANGUAGES.ENGLISH;
        }
        selectedLanguage = language;
        console.log(`Language set to ${selectedLanguage} from playOptions`);
        return selectedLanguage;
    }
}

export const springrollGame = new SpringrollGame();