import { Plugins } from 'phaser';
import { Ball } from '../gameobjects';

export class FactoryPlugin extends Plugins.BasePlugin
{
    constructor(pluginManager)
    {
        super(pluginManager);
        this.pluginManager.registerGameObject('ball', this.createBall);
    }

    createBall(x, y)
    {
        // the context of `this` is the `GameObjectFactory` for the scene .add is called on.
        const ball = new Ball(this.scene, x, y);
        
        this.displayList.add(ball); // <-- only objects in the display list get displayed
        this.updateList.add(ball); // <-- only objects in the update list get updated every frame.
        
        return ball;
    }
}