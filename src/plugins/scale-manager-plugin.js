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

    onResize({ scaleRatio })
    {
        const canvas = this.game.canvas;

        canvas.style.width = `${this.scaleManager.gameWidth * scaleRatio}px`;
        canvas.style.height = `${this.scaleManager.gameHeight * scaleRatio}px`;
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