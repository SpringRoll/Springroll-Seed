import './styles.css';

import { ApplicationPlugin, FactoryPlugin, ScaleManagerPlugin } from './plugins';
import { TitleScene, GameScene } from './scenes';
import { GAMEPLAY } from './constants';

// setup game config.
const game = new Phaser.Game(
{
    type: Phaser.AUTO,
    width: GAMEPLAY.WIDTH,
    height: GAMEPLAY.HEIGHT,
    backgroundColor: '#000000', //'#6495ED', // <-- Cornflower Blue
    parent: 'gameContent',
    plugins:
    {
        global: [
            // Install a Springroll Application as a global phaser plugin.
            { key: "ApplicationPlugin", plugin: ApplicationPlugin, start: true, mapping: 'app' },
            { key: "FactoryPlugin", plugin: FactoryPlugin, start: true },
            { // Install Scale Manager Plugin, with scaling settings
                key: "ScaleManagerPlugin",
                plugin: ScaleManagerPlugin,
                start: true,
                mapping: 'scaleManager',
                data:
                {
                    width: GAMEPLAY.WIDTH,
                    height: GAMEPLAY.HEIGHT,
                    safeWidth: GAMEPLAY.SAFE_WIDTH,
                    safeHeight: GAMEPLAY.SAFE_HEIGHT
                }
            }
        ]
    },
    scene: [TitleScene, GameScene]
});