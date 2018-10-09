import './styles.css';

import { ApplicationPlugin, FactoryPlugin } from './plugins';
import { TitleScene, GameScene } from './scenes';

// setup game config.
const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 256,
    backgroundColor: '#000000', //'#6495ED', // <-- Cornflower Blue
    parent: 'content',
    plugins:
    {
        global: [
            // Install a Springroll Application as a global phaser plugin.
            { key: "ApplicationPlugin", plugin: ApplicationPlugin, start: true, mapping: 'app' },
            { key: "FactoryPlugin", plugin: FactoryPlugin, start: true }
        ]
    },
    scene: [TitleScene, GameScene]
}

const game = new Phaser.Game(config);