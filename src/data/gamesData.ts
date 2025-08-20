//src/data/gamesData.ts
'use client';

import { Game } from '@/types/game';

export const games: Game[] = [
  { 
    id: 'witcher-3', 
    name: 'The Witcher 3: Wild Hunt', 
    hours: 6945, 
    lastLaunch: '22 июн.',  
    achievements: '78/78', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg' 
  },
  { 
    id: 'warframe', 
    name: 'Warframe', 
    hours: 5206, 
    lastLaunch: '30 июн.',  
    achievements: '193/193', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/230410/header.jpg' 
  },
  { 
    id: 'eve-online', 
    name: 'EVE Online', 
    hours: 4807, 
    lastLaunch: '4 апр.',  
    achievements: '-', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/8500/header.jpg' 
  },
  { 
    id: 'black-desert', 
    name: 'Black Desert', 
    hours: 1950, 
    lastLaunch: '28 авг. 2023', 
    achievements: '-', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/582660/header.jpg' 
  },
  { 
    id: 'counter-strike-2', 
    name: 'Counter-Strike 2', 
    hours: 1923, 
    lastLaunch: '18 нояб. 2023', 
    achievements: '1/1', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg' 
  },
  { 
    id: 'apex-legends', 
    name: 'Apex Legends', 
    hours: 1884, 
    lastLaunch: '19 мая 2024', 
    achievements: '2/12', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg' 
  },
  { 
    id: 'dead-by-daylight', 
    name: 'Dead by Daylight', 
    hours: 1701, 
    lastLaunch: '26 мая', 
    achievements: '227/279', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/381210/header.jpg' 
  },
  { 
    id: 'destiny-2', 
    name: 'Destiny 2', 
    hours: 1598, 
    lastLaunch: '6 мая 2023', 
    achievements: '23/23', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1085660/header.jpg' 
  },
  { 
    id: 'crossout', 
    name: 'Crossout', 
    hours: 1361, 
    lastLaunch: '29 мая', 
    achievements: '193/193', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/386180/header.jpg' 
  },
  { 
    id: 'hunt-showdown', 
    name: 'Hunt: Showdown 1896', 
    hours: 1357, 
    lastLaunch: '1 февр.', 
    achievements: '36/36', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/594650/header.jpg' 
  },
  { 
    id: 'gtfo', 
    name: 'GTFO', 
    hours: 989, 
    lastLaunch: 'Активная игра', 
    achievements: '56/57', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/493520/header.jpg' 
  },
  { 
    id: 'shattered-pixel-dungeon', 
    name: 'Shattered Pixel Dungeon', 
    hours: 876, 
    lastLaunch: '3 апр.', 
    achievements: '83/97', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1769170/header.jpg' 
  },
  { 
    id: 'zhi-jiang-pan-zhi-meng', 
    name: '枝江畔之梦', 
    hours: 871, 
    lastLaunch: '15 сент. 2024', 
    achievements: '20/20', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1827680/header.jpg' 
  },
  { 
    id: 'payday-2', 
    name: 'PAYDAY 2', 
    hours: 836, 
    lastLaunch: '15 мар. 2024', 
    achievements: '1302/1328', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/218620/header.jpg' 
  },
  { 
    id: 'dawn-of-war-soulstorm', 
    name: 'Dawn of War - Soulstorm', 
    hours: 794, 
    lastLaunch: '29 нояб. 2024', 
    achievements: '', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/9450/header.jpg' 
  },
  { 
    id: 'generation-zero', 
    name: 'Generation Zero®', 
    hours: 632, 
    lastLaunch: '28 июн. 2024', 
    achievements: '72/72', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/704270/header.jpg' 
  },
  { 
    id: 'palia', 
    name: 'Palia', 
    hours: 628, 
    lastLaunch: '5 апр.', 
    achievements: '52/52', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2707930/header.jpg' 
  },
  { 
    id: 'ropuka-idle-island', 
    name: 'Ropuka\'s Idle Island', 
    hours: 620, 
    lastLaunch: '14 июл.', 
    achievements: '30/31', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/3416070/header.jpg' 
  },
  { 
    id: 'frostpunk', 
    name: 'Frostpunk', 
    hours: 576, 
    lastLaunch: '6 нояб. 2023', 
    achievements: '0/115', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/323190/header.jpg' 
  },
  { 
    id: 'ark-survival-evolved', 
    name: 'ARK: Survival Evolved', 
    hours: 545, 
    lastLaunch: '12 февр. 2023', 
    achievements: '32/32', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/346110/header.jpg' 
  },
  { 
    id: 'scp-secret-laboratory', 
    name: 'SCP: Secret Laboratory', 
    hours: 493, 
    lastLaunch: '6 мая 2023', 
    achievements: '35/52', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/700330/header.jpg' 
  },
  { 
    id: 'albion-online', 
    name: 'Albion Online', 
    hours: 485, 
    lastLaunch: '27 апр. 2023', 
    achievements: '0/154', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/761890/header.jpg' 
  },
  { 
    id: 'northgard', 
    name: 'Northgard', 
    hours: 474, 
    lastLaunch: '11 янв.', 
    achievements: '0/289', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/466560/header.jpg' 
  },
  { 
    id: 'tradesman', 
    name: 'TRADESMAN: Deal to Dealer', 
    hours: 445, 
    lastLaunch: 'Активная игра', 
    achievements: 'Скоро будут ;)', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2555430/header.jpg' 
  },
  { 
    id: 'rogue-company', 
    name: 'Rogue Company', 
    hours: 409, 
    lastLaunch: '6 мая 2023', 
    achievements: '20/20', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/872200/header.jpg' 
  },
  { 
    id: 'rimworld', 
    name: 'RimWorld', 
    hours: 314, 
    lastLaunch: '19 дек. 2023', 
    achievements: '-', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/294100/header.jpg' 
  },
  { 
    id: 'asphalt-legends-unite', 
    name: 'Asphalt Legends Unite', 
    hours: 262, 
    lastLaunch: '25 июн.', 
    achievements: '39/42', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1815780/header.jpg' 
  },
  { 
    id: 'warhammer-40k-gladius', 
    name: 'Warhammer 40,000: Gladius', 
    hours: 254, 
    lastLaunch: '23 апр. 2024', 
    achievements: '97/166', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/489630/header.jpg' 
  },
  { 
    id: 'death-stranding', 
    name: 'DEATH STRANDING DIRECTOR\'S CUT', 
    hours: 251, 
    lastLaunch: '16 июн. 2024', 
    achievements: '31/63', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1850570/header.jpg' 
  },
  { 
    id: 'the-first-descendant', 
    name: 'The First Descendant', 
    hours: 198, 
    lastLaunch: '17 мая', 
    achievements: '24/24', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2074920/header.jpg' 
  },
  { 
    id: 'volcanoids', 
    name: 'Volcanoids', 
    hours: 198, 
    lastLaunch: '10 мая 2024', 
    achievements: '21/40', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/951440/header.jpg' 
  },
  { 
    id: 'darkest-dungeon', 
    name: 'Darkest Dungeon®', 
    hours: 169, 
    lastLaunch: '23 сент. 2023', 
    achievements: '120/120', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/262060/header.jpg' 
  },
  { 
    id: 'deep-rock-galactic', 
    name: 'Deep Rock Galactic', 
    hours: 155, 
    lastLaunch: '18 мая', 
    achievements: '53/69', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/548430/header.jpg' 
  },
  { 
    id: 'paladins', 
    name: 'Paladins', 
    hours: 152, 
    lastLaunch: '16 дек. 2022', 
    achievements: '58/58', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/444090/header.jpg' 
  },
  { 
    id: 'v-rising', 
    name: 'V Rising', 
    hours: 147, 
    lastLaunch: '10 мая 2024', 
    achievements: '0/49', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1604030/header.jpg' 
  },
  { 
    id: 'beholder', 
    name: 'Beholder', 
    hours: 143, 
    lastLaunch: '2 мар. 2023', 
    achievements: '60/60', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/475550/header.jpg' 
  },
  { 
    id: 'scp-containment-breach', 
    name: 'SCP: Containment Breach Multiplayer', 
    hours: 124, 
    lastLaunch: '23 нояб. 2022', 
    achievements: '41/41', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1782380/header.jpg' 
  },
  { 
    id: 'crusader-kings-2', 
    name: 'Crusader Kings II', 
    hours: 90, 
    lastLaunch: '9 дек. 2023', 
    achievements: '161/161', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/203770/header.jpg' 
  },
  { 
    id: 'dawn-of-war-3', 
    name: 'Warhammer 40,000: Dawn of War III', 
    hours: 88, 
    lastLaunch: '15 июн.', 
    achievements: '84/84', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/285190/header.jpg' 
  },
  { 
    id: 'mudrunner', 
    name: 'MudRunner', 
    hours: 82, 
    lastLaunch: '14 июн.', 
    achievements: '60/62', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/675010/header.jpg' 
  },
  { 
    id: 'dr-livesey', 
    name: 'DR LIVESEY ROM AND DEATH EDITION', 
    hours: 78, 
    lastLaunch: '15 сент. 2024', 
    achievements: '96/130', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2181930/header.jpg' 
  },
  { 
    id: 'aimlabs', 
    name: 'Aimlabs', 
    hours: 74, 
    lastLaunch: '15 янв. 2024', 
    achievements: '100/100', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/714010/header.jpg' 
  },
  { 
    id: 'geometry-dash', 
    name: 'Geometry Dash', 
    hours: 62, 
    lastLaunch: '22 июн.', 
    achievements: '31/120', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/322170/header.jpg' 
  },
  { 
    id: 'expeditions', 
    name: 'Expeditions: A MudRunner Game', 
    hours: 72, 
    lastLaunch: 'Активная игра', 
    achievements: '13/20', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2477340/header.jpg' 
  },
  { 
    id: 'among-us', 
    name: 'Among Us', 
    hours: 57, 
    lastLaunch: '9 авг. 2023', 
    achievements: '33/33', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg' 
  },
  { 
    id: 'keo', 
    name: 'KEO', 
    hours: 41, 
    lastLaunch: '16 июн. 2022', 
    achievements: '-', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1424910/header.jpg' 
  },
  { 
    id: 'foxhole', 
    name: 'Foxhole', 
    hours: 37, 
    lastLaunch: '21 июн. 2024', 
    achievements: '-', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/505460/header.jpg' 
  },
  { 
    id: 'once-human', 
    name: 'Once Human', 
    hours: 37, 
    lastLaunch: '27 июл. 2024', 
    achievements: '-', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2139460/header.jpg' 
  },
  { 
    id: 'will-to-live', 
    name: 'Will To Live Online', 
    hours: 34, 
    lastLaunch: '9 мая 2023', 
    achievements: '-', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/707010/header.jpg' 
  },
  { 
    id: 'hue', 
    name: 'Hue', 
    hours: 33, 
    lastLaunch: '30 авг. 2023', 
    achievements: '10/13', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/383270/header.jpg' 
  },
  { 
    id: 'lethal-company', 
    name: 'Lethal Company', 
    hours: 32, 
    lastLaunch: '27 янв. 2024', 
    achievements: '-', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1966720/header.jpg' 
  },
  { 
    id: 'tiny-glade', 
    name: 'Tiny Glade', 
    hours: 39, 
    lastLaunch: '6 окт. 2024', 
    achievements: '-', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2198150/header.jpg' 
  },
  { 
    id: 'scrap-mechanic', 
    name: 'Scrap Mechanic', 
    hours: 26, 
    lastLaunch: '2 мар. 2024', 
    achievements: '-', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/387990/header.jpg' 
  },
  { 
    id: 'fallout-shelter', 
    name: 'Fallout Shelter', 
    hours: 23, 
    lastLaunch: '20 июл. 2023', 
    achievements: '35/35', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/588430/header.jpg' 
  },
  { 
    id: 'urbo', 
    name: 'URBO', 
    hours: 17, 
    lastLaunch: '17 мая', 
    achievements: '24/29', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2141770/header.jpg' 
  },
  { 
    id: 'ripout', 
    name: 'RIPOUT', 
    hours: 13, 
    lastLaunch: '12 янв.', 
    achievements: '36/69', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1558830/header.jpg' 
  },
  { 
    id: 'astroneer', 
    name: 'ASTRONEER', 
    hours: 10, 
    lastLaunch: '10 мая 2024', 
    achievements: '19/56', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/361420/header.jpg' 
  },
  { 
    id: 'dawn-of-war-anniversary', 
    name: 'Warhammer 40,000: Dawn of War - Anniversary Edition', 
    hours: 10, 
    lastLaunch: '25 сент. 2024', 
    achievements: '-', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/4570/header.jpg' 
  },
  { 
    id: 'redkit', 
    name: 'REDkit для игры «Ведьмак 3»', 
    hours: 10, 
    lastLaunch: '16 июл. 2024', 
    achievements: '-', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2684660/header.jpg' 
  },
  { 
    id: 'the-forest', 
    name: 'The Forest', 
    hours: 9, 
    lastLaunch: '25 нояб. 2023', 
    achievements: '10/45', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/242760/header.jpg' 
  },
  { 
    id: 'wrc-7', 
    name: 'WRC 7', 
    hours: 8, 
    lastLaunch: '25 июл. 2024', 
    achievements: '7/41', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/621830/header.jpg' 
  },
  { 
    id: 'masterplan-tycoon', 
    name: 'Masterplan Tycoon', 
    hours: 7, 
    lastLaunch: '8 июл. 2024', 
    achievements: '8/16', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1644500/header.jpg' 
  },
  { 
    id: 'soundfall', 
    name: 'Soundfall', 
    hours: 6, 
    lastLaunch: '27 окт. 2024', 
    achievements: '19/45', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1608700/header.jpg' 
  },
  { 
    id: 'the-forever-winter', 
    name: 'The Forever Winter', 
    hours: 10, 
    lastLaunch: '31 окт. 2024', 
    achievements: '-', 
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2828860/header.jpg' 
  },
  { 
    id: 'eve-frontier', 
    name: 'EVE Frontier', 
    hours: 52, 
    lastLaunch: 'Активная игра', 
    achievements: '-', 
    image: '/img/eve-frontier.jpg' 
  }
];

export const topGames: Game[] = [
  games.find(game => game.id === 'witcher-3')!,
  games.find(game => game.id === 'gtfo')!,
  games.find(game => game.id === 'dawn-of-war-soulstorm')!,
  games.find(game => game.id === 'tradesman')!,
  games.find(game => game.id === 'eve-frontier')!,
].filter(Boolean) as Game[];

export const currentGames: (Game & { progress: number })[] = [
  { ...games.find(game => game.id === 'expeditions')!, progress: 47 },
  { ...games.find(game => game.id === 'eve-frontier')!, progress: 32 },
].filter(Boolean) as (Game & { progress: number })[];