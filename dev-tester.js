import s from './s2pd.js'

s.ezSetup();

const hero = new s.Sprite(0, 0, './dev-assets/hero.png', 35, 4);
hero.feelGravity();

s.keyDown('space', () => { hero.updateSize(1.01) });

s.whileLoading(() => {
  //What to do while assets load.
})

s.onFirstTime(() => {
  //What to do on first time through loop.
})

s.loop(() => {
  //Tasks to be carried out each time through loop.
});