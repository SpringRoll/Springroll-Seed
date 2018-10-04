class Cache
{
    constructor()
    {
        this.images = {};
    }

    onLoad(event)
    {
        const item = event.item;
        const type = item.type;

        // Cache loaded objects for later use.
        switch (type)
        {
            case createjs.Types.IMAGE:
                this.images[item.id] = event.result;
                break;
            case createjs.Types.SOUND:
                //ignore sounds, because SoundJS has it's own cache.
                break;
            default:
                console.warn(`Unhandled Load Type: ${type}`)
                break;
        }
    }
}

export const GameCache = new Cache();