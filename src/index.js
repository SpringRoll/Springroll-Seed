import './styles.css';
import { Game } from './game';
import { GAMEPLAY } from './constants';

const template = new Game(GAMEPLAY.MAX_WIDTH, GAMEPLAY.MAX_HEIGHT);
template.run();