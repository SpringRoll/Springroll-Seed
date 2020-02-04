import Phaser from 'phaser';

import { BaseScene } from "./base-scene";
import { SCENE, GAMEPLAY } from "../constants";
import { Anchor } from 'springroll';

export class TitleScene extends BaseScene
{
    constructor()
    {
        super({ key: SCENE.TITLE })
    }

    preload()
    {
        // load assets
        this.load.image('background', './assets/BG1320x780-2.png')
    }

    create()
    {
        super.create();
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

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
        this.scaleManager.addEntity(this.textAnchor);
    }

    startText_onPointerDown(pointer)
    {
        this.scene.start(SCENE.GAME);
    }

    shutdown()
    {
        this.scaleManager.removeEntity(this.textAnchor);
        super.shutdown();
    }
}