import './styles.css';
import { Game } from './game';
import { GAMEPLAY } from './constants';

const template = new Game(GAMEPLAY.WIDTH, GAMEPLAY.HEIGHT);
template.run();