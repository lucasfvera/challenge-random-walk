const element = document.getElementById('stage');
/**
 * @type {(HTMLCanvasElement|null)}
 */
export const canvas = element instanceof HTMLCanvasElement ? element : null;
export const context = canvas?.getContext('2d');

export const SAMPLES = 1;
export const SQUARE_SIZE = 10;
export const DISTANCE = 2;
