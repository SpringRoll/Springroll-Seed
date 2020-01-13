import Phaser from 'phaser';
import { EventEmitter } from 'eventemitter3'

import { SafeScaleManager } from 'springroll';
import { GAMEPLAY } from '../constants';

// The ScaleManagerPlugin is just a wrapper for Springroll's
// ScaleManager with the Phaser dependent resize implemented. 
export class ScaleManagerPlugin extends Phaser.Plugins.BasePlugin
{
    constructor(pluginManager)
    {
        super(pluginManager);
        this.onResize = this.onResize.bind(this);
    }

    init({ width, height, safeWidth, safeHeight })
    {
        this.scaleManager = new SafeScaleManager({ width, height, safeWidth, safeHeight });
    }

    start()
    {
        this.scaleManager.enable(this.onResize);
    }

    stop()
    {
        this.scaleManager.disable();
    }

    onResize({ scaleMod })
    {
        const canvas = this.game.canvas;

        canvas.style.width = `${this.scaleManager.gameWidth * scaleMod}px`;
        canvas.style.height = `${this.scaleManager.gameHeight * scaleMod}px`;


        /*

        game.renderer.resize(GAMEPLAY.WIDTH / scale.x, GAMEPLAY.HEIGHT / scale.y)

        game.canvas.style.width = `${width}px`;
        game.canvas.style.height = `${height}px`;

        game.canvas.style.position = 'absolute'
        game.canvas.style.left = '0px';
        game.canvas.style.top = '0px';

        const { x, y } = this.scaleManager.calcOffset(scale);

        */
    }

    addEntity(entity)
    {
        this.scaleManager.addEntity(entity);
    }

    removeEntity(entity)
    {
        this.scaleManager.removeEntity(entity);
    }

    forceRecheck()
    {
        window.dispatchEvent(new Event('resize'));
    }
}