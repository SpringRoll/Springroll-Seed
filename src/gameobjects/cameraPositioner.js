import { ScaledEntity } from "springroll/src/scale-manager/ScaledEntity";

/**
 * Example of a ScaledEntity used to offset Phaser's Camera viewports
 * @export
 * @class CameraPositioner
 * @extends ScaledEntity
 */
export class CameraPositioner extends ScaledEntity
{
    constructor(camera)
    {
        super();
        this.camera = camera;
    }

    onResize({ offset, gameSize })
    {
        this.camera.setViewport(-offset.x, -offset.y, gameSize.x, gameSize.y);
    }
}