import Phaser from 'phaser';
import { Application } from 'springroll';
import { GAMEPLAY, SCENE } from '../constants';

// the easiest way to treat an Application as if it were a phaser plugin
// is to extend Application than implement the plugin functions:
// -- init, boot, start, stop, destroy
// also have a PluginManager param in the constructor.

/**
 * @export
 * @class ApplicationPlugin
 * @extends Application
 */
export class ApplicationPlugin extends Application
{
    /**
     * Creates an instance of ApplicationPlugin.
     * @param  {Phaser.Plugins.PluginManager} pluginManager 
     * @memberof ApplicationPlugin
     */
    constructor(pluginManager)
    {
        super(
        {
            features:
            {
                sfx: true
            }
        });
        this.pluginManager = pluginManager;
        this.game = pluginManager.game;
    }

    init()
    {
        // wait for the app to be ready, then set the initial scene  
        this.state.ready.subscribe(() =>
        {
            this.game.scene.start(GAMEPLAY.INITIAL_SCENE)
        });

        // handle necessary springroll states.
        this.state.pause.subscribe((current) =>
        {
            if(current)
            {
                this.game.scene.pause(SCENE.GAME);
            }
            else
            {
                this.game.scene.resume(SCENE.GAME);
            }
        });

        this.state.soundVolume.subscribe((current) =>
        {
            this.game.sound.volume = current;
        });
    }

    start() {}
    stop() {}

    destroy()
    {
        this.pluginManager = null
        this.game = null
    }
}