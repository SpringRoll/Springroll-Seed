import Phaser from 'phaser'
import { GAMEPLAY } from '../constants';
import { CameraPositioner } from '../gameobjects';

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
        this.events.addListener('shutdown', this.shutdown, this);

        // Part of the Scaling for Phaser involves offsetting the viewport.
        this.cameraPositioner = new CameraPositioner(this.cameras.main);
        this.scaleManager.addEntity(this.cameraPositioner);
    }

    shutdown()
    {
        this.scaleManager.removeEntity(this.cameraPositioner);
    }
}