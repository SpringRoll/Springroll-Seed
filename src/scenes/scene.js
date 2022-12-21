import createjs from 'createjs';

export class Scene extends createjs.Container
{
    constructor(game)
    {
        super();
        this.game = game;
    }

    preload()
    {
        // nothing to load
        return Promise.resolve();
    }

    start()
    {
    }

    update()
    {
    }

    stop()
    {
    }
}