/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

/*
 * Allows us to import json files like this:
 *
 *    import { default as data } from 'data.json';
 */
declare module "*.json" {
  const value: any;
  export default value;
}


/**
 * To import this node module:
 *
 *     import * as currency_codes from "currency-codes";
 */
declare module "currency-codes"
