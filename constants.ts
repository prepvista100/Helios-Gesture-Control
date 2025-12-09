import { PlanetData } from './types';

export const SOLAR_SYSTEM_SCALE = 1;

// Using a stable S3 bucket often used for Three.js demos to ensure availability
const TEXTURE_PATH = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271";
export const SUN_TEXTURE_URL = `${TEXTURE_PATH}/sun.jpg`;
export const SATURN_RING_TEXTURE_URL = "https://i.postimg.cc/zz7TM4qM/saturn-rings-top.png"; // Specific ring texture

export const PLANETS: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    color: '#A5A5A5',
    radius: 0.8,
    distance: 10,
    speed: 0.04, // Fast orbit
    textureUrl: `${TEXTURE_PATH}/mercury.jpg`,
    description: "The smallest planet in the Solar System and the closest to the Sun.",
    details: { 
      mass: "3.30 × 10^23 kg", 
      temp: "167 °C", 
      moons: 0,
      orbitalPeriod: "88 days",
      eccentricity: "0.206",
      axialTilt: "0.03°"
    },
    orbit: { eccentricity: 0, perihelion: 0, tilt: 0.03 } // Keeping 0 eccentricity as requested
  },
  {
    id: 'venus',
    name: 'Venus',
    color: '#E3BB76',
    radius: 1.5,
    distance: 15,
    speed: 0.015,
    textureUrl: `${TEXTURE_PATH}/venus_atmosphere.jpg`,
    description: "Second planet from the Sun. It has the hottest planetary atmosphere.",
    details: { 
      mass: "4.87 × 10^24 kg", 
      temp: "464 °C", 
      moons: 0,
      orbitalPeriod: "225 days",
      eccentricity: "0.007",
      axialTilt: "177.4°"
    },
    orbit: { eccentricity: 0.007, perihelion: 1.3, tilt: 177.4 }
  },
  {
    id: 'earth',
    name: 'Earth',
    color: '#4F4CB0',
    radius: 1.6,
    distance: 22,
    speed: 0.01,
    textureUrl: `${TEXTURE_PATH}/earth_daymap.jpg`,
    description: "Our home. The only known planet in the universe to harbor life.",
    details: { 
      mass: "5.97 × 10^24 kg", 
      temp: "15 °C", 
      moons: 1,
      orbitalPeriod: "365 days",
      eccentricity: "0.017",
      axialTilt: "23.4°"
    },
    orbit: { eccentricity: 0.017, perihelion: 1.7, tilt: 23.4 }
  },
  {
    id: 'mars',
    name: 'Mars',
    color: '#E27B58',
    radius: 1.1,
    distance: 30,
    speed: 0.008,
    textureUrl: `${TEXTURE_PATH}/mars.jpg`,
    description: "The Red Planet. Home to Olympus Mons, the largest volcano in the solar system.",
    details: { 
      mass: "6.42 × 10^23 kg", 
      temp: "-65 °C", 
      moons: 2,
      orbitalPeriod: "687 days",
      eccentricity: "0.094",
      axialTilt: "25.2°"
    },
    orbit: { eccentricity: 0.094, perihelion: 5.0, tilt: 25.2 }
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    color: '#C99039',
    radius: 4.5,
    distance: 45,
    speed: 0.004,
    textureUrl: `${TEXTURE_PATH}/jupiter.jpg`,
    description: "The largest planet. A gas giant with a mass one-thousandth that of the Sun.",
    details: { 
      mass: "1.90 × 10^27 kg", 
      temp: "-110 °C", 
      moons: 95,
      orbitalPeriod: "12 years",
      eccentricity: "0.049",
      axialTilt: "3.1°"
    },
    orbit: { eccentricity: 0.049, perihelion: 0.2, tilt: 3.1 }
  },
  {
    id: 'saturn',
    name: 'Saturn',
    color: '#EAD6B8',
    radius: 3.8,
    distance: 65,
    speed: 0.003,
    textureUrl: `${TEXTURE_PATH}/saturn.jpg`,
    description: "Adorned with a dazzling system of icy rings.",
    details: { 
      mass: "5.68 × 10^26 kg", 
      temp: "-140 °C", 
      moons: 146,
      orbitalPeriod: "29 years",
      eccentricity: "0.057",
      axialTilt: "26.7°"
    },
    orbit: { eccentricity: 0.057, perihelion: 1.6, tilt: 26.7 }
  },
  {
    id: 'uranus',
    name: 'Uranus',
    color: '#D1F7F8',
    radius: 2.5,
    distance: 85,
    speed: 0.002,
    textureUrl: `${TEXTURE_PATH}/uranus.jpg`,
    description: "An ice giant that rotates at a nearly 90-degree angle from the plane of its orbit.",
    details: { 
      mass: "8.68 × 10^25 kg", 
      temp: "-195 °C", 
      moons: 27,
      orbitalPeriod: "84 years",
      eccentricity: "0.046",
      axialTilt: "97.8°"
    },
    orbit: { eccentricity: 0.046, perihelion: 3.0, tilt: 97.8 }
  },
  {
    id: 'neptune',
    name: 'Neptune',
    color: '#5B5DDF',
    radius: 2.4,
    distance: 100,
    speed: 0.001,
    textureUrl: `${TEXTURE_PATH}/neptune.jpg`,
    description: "The most distant major planet. Dark, cold, and whipped by supersonic winds.",
    details: { 
      mass: "1.02 × 10^26 kg", 
      temp: "-200 °C", 
      moons: 14,
      orbitalPeriod: "165 years",
      eccentricity: "0.011",
      axialTilt: "28.3°"
    },
    orbit: { eccentricity: 0.011, perihelion: 0.8, tilt: 28.3 }
  }
];