/**
 * List of available countries.
 * @constant {string[]}
 */
export const countries = ["USA", "Canada", "India"]

/**
 * Mapping of countries to their respective states/provinces.
 * @constant {Object.<string, string[]>}
 */

export const states: { [key: string]: string[] } = {
  USA: ["California", "New York", "Texas"],
  Canada: ["Ontario", "Quebec", "British Columbia"],
  India: ["Odisha", "Uttar Pradesh", "Mumbai"],
}

/**
 * Mapping of states/provinces to their respective cities.
 * @constant {Object.<string, string[]>}
 */

export const cities: { [key: string]: string[] } = {
  California: ["Los Angeles", "San Francisco", "San Diego"],
  "New York": ["New York City", "Buffalo", "Albany"],
  Texas: ["Houston", "Austin", "Dallas"],
  Ontario: ["Toronto", "Ottawa", "Hamilton"],
  Quebec: ["Montreal", "Quebec City", "Laval"],
  "British Columbia": ["Vancouver", "Victoria", "Surrey"],
  Odisha: ["Puri", "Bhubaneswar", "Cuttack"],
  "Uttar Pradesh": ["Ayodhya", "Prayagraj", "Varanasi"],
  Mumbai: ["Navi Mumbai", "Pune", "Maharastra"],
}

