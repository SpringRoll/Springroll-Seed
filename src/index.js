import './styles.css';
import 'pixi.js'
import 'pixi-sound';
import { Game } from './game';
import { GAMEPLAY } from './constants';

const template = new Game(GAMEPLAY.WIDTH, GAMEPLAY.HEIGHT);
template.run();