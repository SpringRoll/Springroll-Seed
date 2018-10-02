import './styles.css';
import 'springroll';
import { create } from 'domain';

let stage = new createjs.Stage('stage');
var shape = new createjs.Shape();
shape.graphics.beginFill('red').drawRect(0, 0, 120, 120);
stage.addChild(shape);
stage.update();