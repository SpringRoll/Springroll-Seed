import Phaser from 'phaser';

import { BaseScene } from "./base-scene";
import { SCENE } from "../constants";

export class TitleScene extends BaseScene
{
    constructor()
    {
        super({ key: SCENE.TITLE })
    }

    create()
    {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const startText = this.make.text(
        {
            x: 10,
            y: 10,
            text: 'Click Here!',
            style:
            {
                font: '20px monospace',
                fill: '#FFFFFF'
            }
        });
        startText.setInteractive();
        startText.on('pointerdown', this.startText_onPointerDown, this);
    }

    startText_onPointerDown(pointer)
    {
        this.scene.start(SCENE.GAME);
    }
}