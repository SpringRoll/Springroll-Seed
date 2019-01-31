import Phaser from 'phaser'
import { GAMEPLAY } from '../constants';

/** 
 * @typedef {import('../plugins/application-plugin').ApplicationPlugin} ApplicationPlugin 
 */

/** 
 * @typedef {import('../plugins/scale-manager-plugin').ScaleManagerPlugin} ScaleManagerPlugin 
 */

/**
 * 
 * @export
 * @class BaseScene
 * @extends Phaser.Scene
 */
export class BaseScene extends Phaser.Scene
{
    constructor({ key, active = false })
    {
        super({ key, active });
        this.key = key;

        /** @type {ApplicationPlugin} */
        this.app; // <-- this is injected by phaser.

        /** @type {ScaleManagerPlugin} */
        this.scaleManager; // <-- this is injected by phaser.
    }

    create()
    {      
        this.scaleManager.events.addListener('resize', this.onViewportChange, this);
        this.events.addListener('shutdown', this.shutdown, this);

        // resize needs to be called on scene load
        // because each scene has it's own camera.
        this.scaleManager.forceRecheck();
    }

    onViewportChange({ x, y, width, height })
    {
        // Part of the scaling in Phaser involves shifting the
        // camera's viewport. camera's are handled per-scene.
        // this can also be edited to support multiple cameras
        // IE: split-screen multiplayer games. 
        this.cameras.main.setViewport(x, y, width, height);
    }

    shutdown()
    {
        this.scaleManager.events.removeListener('resize', this.onViewportChange, this);
    }
}