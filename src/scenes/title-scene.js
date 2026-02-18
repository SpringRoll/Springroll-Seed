import Phaser from 'phaser';

import { SCENE, GAMEPLAY } from "../constants";
import { Anchor } from 'springroll';

export class TitleScene extends Phaser.Scene
{
    preload()
    {
        // load assets
        this.load.image('background', './assets/BG1320x780-2.png')
    }

    create()
    {
        this.add.image(GAMEPLAY.WIDTH / 2, GAMEPLAY.HEIGHT / 2, 'background');

        const startText = this.make.text(
        {
            text: 'Click Here!',
            style:
            {
                font: '20px monospace',
                fill: '#FFFFFF'
            }
        });
        startText.setInteractive()
        startText.on('pointerdown', this.startText_onPointerDown, this);
        // Anchor the text to the top left of the screen. { -1, -1 }
        this.textAnchor = new Anchor(
        {
            position: { x: 10, y: 10 },
            direction: {x: -1, y: -1},
            callback: ({ x, y }) =>
            {
                startText.x = x;
                startText.y = y;
            }
        });
        const safeScale = this.game.registry.get('safeScale');
        safeScale.addEntity(this.textAnchor);
    }

    startText_onPointerDown()
    {
        this.scene.start(SCENE.GAME);
    }
}