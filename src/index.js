import './styles.css';

import { ApplicationPlugin, FactoryPlugin, ResizePlugin } from './plugins';
import { TitleScene, GameScene } from './scenes';

// setup game config.
const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 256,
    height: 256,
    backgroundColor: '#000000', //'#6495ED', // <-- Cornflower Blue
    parent: 'gameContent',
    plugins:
    {
        global: [
            // Install a Springroll Application as a global phaser plugin.
            { key: "ApplicationPlugin", plugin: ApplicationPlugin, start: true, mapping: 'app' },
            { key: "FactoryPlugin", plugin: FactoryPlugin, start: true },
            { key: "ResizePlugin", plugin: ResizePlugin, start: true, mapping: 'resizer' }
        ]
    },
    scene: [TitleScene, GameScene]
});

