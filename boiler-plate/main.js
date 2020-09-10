import s from './s2pd/s2pd.js'

s.ezSetup();

/* *********************************
 * Declare game objects            *
 ********************************* */

const hero = new s.Sprite(0, 0, './hero.png', 35, 4);

/* *********************************
 * Declare events                  *
 ********************************* */

s.keyDown('space', () => { hero.updateSize(1.01) });

/* *********************************
 * Define what happens during loop.*
 ********************************* */

s.whileLoading(() => {
  //What to do while assets load.
})

s.onFirstTime(() => {
  //What to do on first time through loop.
})

s.loop(() => {
  //Tasks to be carried out each time through loop.
});