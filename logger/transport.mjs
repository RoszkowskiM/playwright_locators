import { createWriteStream } from "node:fs";


// https://getpino.io/#/docs/transports?id=v7-transports 
export default (options) => {
  return createWriteStream(options.destination);
};