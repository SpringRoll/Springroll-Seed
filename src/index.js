import './styles.css';
import { Game } from './game';
import { GAMEPLAY } from './constants';

// eslint-disable-next-line no-unused-vars
const template = new Game(GAMEPLAY.WIDTH, GAMEPLAY.HEIGHT);
template.emitter.once('ready', () =>
{
    template.run();
});