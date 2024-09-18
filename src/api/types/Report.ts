/**
 * @summary Type Definition for Report sent by a Wayfinder App user
 * @author LocalNewsTV
 */
type Report = {
  latitude: Number;
  longitude: Number;
  time: Date;
  submissionTime: Date;
  expirationTime: Date;
  eventType: String;
  details: String
  phone?: String
  ticketNum?: String
}

export default Report;
