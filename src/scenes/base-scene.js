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
        this.events.addListener('shutdown', this.shutdown, this);
    }

    shutdown()
    {
    }
}