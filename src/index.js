import './styles.css';
import * as PIXI from 'pixi.js';
import { sound } from '@pixi/sound';
import { Game } from './game';
import { GAMEPLAY } from './constants';

const template = new Game(GAMEPLAY.WIDTH, GAMEPLAY.HEIGHT);
template.run();