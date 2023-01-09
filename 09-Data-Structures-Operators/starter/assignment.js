const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};
const gameEvents = new Map([
    [17, '⚽ GOAL'],
    [36, '🔁 Substitution'],
    [47, '⚽ GOAL'],
    [61, '🔁 Substitution'],
    [64, '🔶 Yellow card'],
    [69, '🔴 Red card'],
    [70, '🔁 Substitution'],
    [72, '🔁 Substitution'],
    [76, '⚽ GOAL'],
    [80, '⚽ GOAL'],
    [92, '🔶 Yellow card'],
]);
// Coding Challenge #1
// const [players1, players2] = game.players;
// const [gk1, ...fieldPlayers1] = players1;
// const [gk2, ...fieldPlayers2] = players2;

// const allPlayers = [...players1, ...players2];

// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// const { team1, x: draw, team2 } = game.odds;
// console.log(team1, draw, team2);

// function printGoals(...players) {
//     console.log(...players);
//     console.log(`${players.length} goals were scored!`);
// }

// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals(...game.scored);

// Coding Challenge #2
// for (const [index, Name] of game.scored.entries()) {
//     console.log(`Goal ${index + 1}: ${Name}`);
// }

// const odds = Object.values(game.odds);
// let Sum = 0;
// for (const value of odds) {
//     Sum += value;
// }
// const oddsAverage = Sum / odds.length;
// console.log(oddsAverage);

// for (const [team, odd] of Object.entries(game.odds)) {
//     const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
//     console.log(`Odd of ${teamStr}: ${odd}`);
// }

// Coding Challenge #3
// const events = [...new Set([...gameEvents.values()])];
// console.log(events);

// gameEvents.delete(64);
// console.log(gameEvents);

// // An event happened, on average, every 9 minutes
// console.log(
//     `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );

// for (const [minute, event] of gameEvents.entries()) {
//     const halfStr = minute <= 45 ? '[FIRST HALF]' : '[SECOND HALF]';
//     console.log(`${halfStr}${minute}: ${event}`);
// }

/*
underscore_case
 first_name_and_last_NAME
Some_Variable
  calculate_AGE_and_RetURn
delayed_departure
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
    const str = document.querySelector('textarea').value;
    const lines = str.split('\n');
    const newLines = [];
    for (const [ind, line] of lines.entries()) {
        lowerCaseLine = line.trim().toLowerCase();
        const words = lowerCaseLine.split('_');
        for (let i = 1; i < words.length; i++) {
            words[i] = words[i].replace(words[i][0], words[i][0].toUpperCase());
        }
        newLines.push(
            words.join('').padEnd(30, ' ') + `${'✅'.repeat(ind + 1)}`
        );
    }
    newText = newLines.join('\n');
    console.log(newText);
    document.querySelector('textarea').value = newText;
});
