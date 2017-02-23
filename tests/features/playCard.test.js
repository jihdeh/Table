 import { server } from '../../app/server';
 import createBrowser from '../browsers/phantom';

describe('concurrent phantom instances', async () => {
  let tableBrowser;
  let playerBrowser;

  beforeAll(async () =>{
    tableBrowser = await createBrowser();
    playerBrowser = await createBrowser();
  });

  beforeEach(async () => {
    await tableBrowser.visit('/table');
    await playerBrowser.visit('/play');
  });

   it('loads table correctly', async () => {
     const pile = await tableBrowser.find('.pile');
     expect(pile.className).toBe('pile');
   });

  it('loads player correctly', async () => {
    const cardDeck = await playerBrowser.find('.deck');
    expect(cardDeck.className).toBe('deck');
  });

  afterAll(async () => {
    await tableBrowser.exit();
    await playerBrowser.exit();
    await server.close();
  });
});
