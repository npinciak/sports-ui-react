import { ClientMlbTeam } from '../team';
import { Stadium } from './stadium.model';

// https://a.espncdn.com/redesign/assets/img/mlb/fields/5.png

export const MLB_STADIUM_MAP: { [key in ClientMlbTeam]: Stadium } = {
  [ClientMlbTeam.LAA]: {
    team: 'Anaheim Angels',
    name: 'Edison International Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/edison_international_field.gif',
    lat: 33.799572,
    lng: -117.889031,
  },
  [ClientMlbTeam.Ari]: {
    team: 'Arizona Diamondbacks',
    name: 'Bankone Ballpark',
    img: 'https://www.baseball-almanac.com/stadium/directions/bank_one_ballpark.gif',
    lat: 33.452922,
    lng: -112.038669,
  },
  [ClientMlbTeam.Atl]: {
    team: 'Atlanta Braves',
    name: 'Turner Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/turner_field.gif',
    lat: 33.74691,
    lng: -84.391239,
  },
  [ClientMlbTeam.Bal]: {
    team: 'Baltimore Orioles',
    name: 'Camden Yards',
    img: 'https://www.baseball-almanac.com/stadium/directions/oriole_park_at_camden_yards.gif',
    lat: 39.285243,
    lng: -76.620103,
  },
  [ClientMlbTeam.Bos]: {
    team: 'Boston Red Sox',
    name: 'Fenway Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/fenway_park.gif',
    lat: 42.346613,
    lng: -71.098817,
  },
  [ClientMlbTeam.ChC]: {
    team: 'Chicago Cubs',
    name: 'Wrigley Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/wrigley_field.gif',
    lat: 41.947201,
    lng: -87.656413,
  },
  [ClientMlbTeam.ChW]: {
    team: 'Chicago White Sox',
    name: 'Guaranteed Rate Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/us_cellular_field.gif',
    lat: 41.830883,
    lng: -87.635083,
  },
  [ClientMlbTeam.Cin]: {
    team: 'Cincinnati Reds',
    name: 'Great American Ballpark',
    img: 'https://www.baseball-almanac.com/stadium/directions/great_american_ballpark.gif',
    lat: 39.107183,
    lng: -84.507713,
  },
  [ClientMlbTeam.Cle]: {
    team: 'Cleveland Indians',
    name: 'Progressive Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/jacobs_field.gif',
    lat: 41.495149,
    lng: -81.68709,
  },
  [ClientMlbTeam.Col]: {
    team: 'Colorado Rockies',
    name: 'Coors Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/coors_field.gif',
    lat: 39.75698,
    lng: -104.965329,
  },
  [ClientMlbTeam.Det]: {
    team: 'Detroit Tigers',
    name: 'Comerica Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/comerica_park.gif',
    lat: 42.346354,
    lng: -83.059619,
  },
  [ClientMlbTeam.Hou]: {
    team: 'Houston Astros',
    name: 'Minute Maid Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/minute_maid_park.gif',
    lat: 29.76045,
    lng: -95.369784,
  },
  [ClientMlbTeam.KC]: {
    team: 'Kansas City Royals',
    name: 'Kauffman Stadium',
    img: 'https://www.baseball-almanac.com/stadium/directions/kauffman_stadium.gif',
    lat: 39.10222,
    lng: -94.583559,
  },
  [ClientMlbTeam.LAD]: {
    team: 'Los Angeles Dodgers',
    name: 'Dodger Stadium',
    img: 'https://www.baseball-almanac.com/stadium/directions/dodger_stadium.gif',
    lat: 34.072437,
    lng: -118.246879,
  },
  [ClientMlbTeam.Mil]: {
    team: 'Milwaukee Brewers',
    name: 'Miller Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/miller_park.gif',
    lat: 43.04205,
    lng: -87.905599,
  },
  [ClientMlbTeam.Min]: {
    team: 'Minnesota Twins',
    name: 'Metrodome',
    img: 'https://www.baseball-almanac.com/stadium/directions/metrodome.gif',
    lat: 44.974346,
    lng: -93.259616,
  },
  [ClientMlbTeam.Wsh]: {
    team: 'Washington Nationals',
    name: 'Nationals Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/nationals_park.gif',
    lat: 38.87,
    lng: -77.01,
  },
  [ClientMlbTeam.NYM]: {
    team: 'New York Mets',
    name: 'Citi Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/citi-field.gif',
    lat: 40.75535,
    lng: -73.843219,
  },
  [ClientMlbTeam.NYY]: {
    team: 'New York Yankees',
    name: 'Yankee Stadium',
    img: 'https://www.baseball-almanac.com/stadium/directions/yankee_stadium.gif',
    lat: 40.819782,
    lng: -73.929939,
  },
  [ClientMlbTeam.Oak]: {
    team: 'Oakland Athletics',
    name: 'Oakland Coliseum',
    img: 'https://www.baseball-almanac.com/stadium/directions/network_associates_coliseum.gif',
    lat: 37.74923,
    lng: -122.196487,
  },
  [ClientMlbTeam.Phi]: {
    team: 'Philadelphia Phillies',
    name: 'Citizens Bank Ballpark',
    img: 'https://www.baseball-almanac.com/stadium/directions/citizens_bank_ballpark.gif',
    lat: 39.952313,
    lng: -75.162392,
  },
  [ClientMlbTeam.Pit]: {
    team: 'Pittsburgh Pirates',
    name: 'PNC Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/PNC_park.gif',
    lat: 40.461503,
    lng: -80.008924,
  },
  [ClientMlbTeam.StL]: {
    team: 'St. Louis Cardinals',
    name: 'Busch Stadium',
    img: 'https://www.baseball-almanac.com/stadium/directions/busch_stadium.gif',
    lat: 38.629683,
    lng: -90.188247,
  },
  [ClientMlbTeam.SD]: {
    team: 'San Diego Padres',
    name: 'Petco Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/petco_park.gif',
    lat: 32.752148,
    lng: -117.143635,
  },
  [ClientMlbTeam.SF]: {
    team: 'San Francisco Giants',
    name: 'Pacific Bell Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/pac_bell_park.gif',
    lat: 37.77987,
    lng: -122.389754,
  },
  [ClientMlbTeam.Sea]: {
    team: 'Seattle Mariners',
    name: 'Safeco Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/safeco_field.gif',
    lat: 47.60174,
    lng: -122.330829,
  },
  [ClientMlbTeam.TB]: {
    team: 'Tampa Bay Devil Rays',
    name: 'Tropicana Field',
    img: 'https://www.baseball-almanac.com/stadium/directions/tropicana_field.gif',
    lat: 27.768487,
    lng: -82.648191,
  },
  [ClientMlbTeam.Tex]: {
    team: 'Texas Rangers',
    name: 'Ballpark in Arlington',
    img: 'https://www.baseball-almanac.com/stadium/directions/ballpark_in_arlington.gif',
    lat: 32.750156,
    lng: -97.081117,
  },
  [ClientMlbTeam.Tor]: {
    team: 'Toronto Blue Jays',
    name: 'Skydome',
    img: 'https://www.baseball-almanac.com/stadium/directions/skydome.gif',
    lat: 43.641653,
    lng: -79.3917,
  },
  [ClientMlbTeam.Mia]: {
    team: 'Miami Marlins',
    name: 'LoanDepot Park',
    img: 'https://www.baseball-almanac.com/stadium/directions/pro_player_park.gif',
    lat: 0,
    lng: 0,
  },
  0: {
    team: 'Unknown',
    name: 'Unknown',
    img: 'Unknown',
    lat: 0,
    lng: 0,
  },
} as const;

export const MLB_STADIUM_LIST = Object.entries(MLB_STADIUM_MAP)
  .map(([key, stat]) => {
    return {
      ...stat,
      id: Number(key),
    };
  })
  .filter(s => s.id !== ClientMlbTeam.FA);

export const MLB_DOME_LIST = MLB_STADIUM_LIST.filter(s =>
  [
    ClientMlbTeam.Tor,
    ClientMlbTeam.Ari,
    ClientMlbTeam.TB,
    ClientMlbTeam.Min,
    ClientMlbTeam.Hou,
    ClientMlbTeam.Mia,
    ClientMlbTeam.Tex,
  ].includes(s.id)
);
