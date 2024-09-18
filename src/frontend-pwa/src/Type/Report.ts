import { ErrorP } from './../views/Report/report.styles';
/**
 * @summary Type Definition for Report sent by a Wayfinder App user
 * @author LocalNewsTV
 */
type Report = {
  // municipality: string;
  latitude: number;
  longitude: number;
  submissionTime: Date;
  expirationTime: Date;
  eventType: string;
  details: string;
  ticketNum?: string
  time?: Date;
}

export default Report;
