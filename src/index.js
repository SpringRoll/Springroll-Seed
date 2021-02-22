import './styles.css';
import {Application} from 'springroll';

const
    app = new Application(),
    state = app.state;

state.pause.subscribe((current) => {
    // Handle game pause.
});
