import Phaser from 'phaser'

/** 
 * @typedef {import('../plugins/application-plugin').ApplicationPlugin} ApplicationPlugin 
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

        /** @type ApplicationPlugin */
        this.app; // <-- this is injected by phaser.
    }
}