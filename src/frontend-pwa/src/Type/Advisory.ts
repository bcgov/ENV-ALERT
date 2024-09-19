/**
 * @summary Type Definition for Advisory submitted by authenticated user
 */
type Advisory = {
  latitude: number;
  longitude: number;
  submissionTime: Date;
  expirationTime: Date;
  eventType: string;
  details: string;
};
export default Advisory;
