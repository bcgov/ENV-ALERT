/**
 * @desc  Seed Data for Development MongoDB Database, contains: 
 *  - initial user account for database access
 *  - some dummy advisories
 */

db = new Mongo().getDB('sus-db');

db.createUser({
    user: "sus-admin",
    pwd: "sus-admin",
    roles: [{role: 'readWrite', db: 'sus-db'}],
});

db.createCollection("locations", {capped: false});
db.createCollection("advisories", {capped: false});
// db.createCollection("updatedates", {capped: false});

// Add dummy advisories
db.advisories.insertMany([
  {
    latitude: 48.44814705,
    longitude: -123.5253112,
    submissionTime: "09/09/2024",
    expirationTime: "23/09/2024",
    eventType: "Swimming",
    details: "Blue Algae spotted in bloom at edge of lake"
  },
  {
    latitude: 48.41754055,
    longitude: -123.4863211,
    submissionTime: "31/08/2024",
    expirationTime: "14/09/2024",
    eventType: "Boil Water",
    details: "Water is of high turbidity (clarity) and should be boiled before consumption"
  },
  {
    latitude: 48.4670847,
    longitude: -123.4706702,
    submissionTime: "05/09/2024",
    expirationTime: "19/09/2024",
    eventType: "Animal Sighting",
    details: "Cougar sighting at park"
  },
  {
    latitude: 48.74187068,
    longitude: -124.7506556,
    submissionTime: "09/09/2024",
    expirationTime: "23/09/2024",
    eventType: "Swimming",
    details: "High ecoli detected in water of lake"
  },
  {
    latitude: 48.45431688,
    longitude: -123.3210171,
    submissionTime: "30/08/2024",
    expirationTime: "13/09/2024",
    eventType: "Boil Water",
    details: "Salmonella microbes have been detected in water supply"
  },
  {
    latitude: 49.52987383,
    longitude: -124.6409528,
    submissionTime: "05/09/2024",
    expirationTime: "19/09/2024",
    eventType: "Animal Sighting",
    details: "Black bear and 4 cubs spotted outside of residential park"
  },
  {
    latitude: 49.39607183,
    longitude: -126.3347032,
    submissionTime: "15/09/2024",
    expirationTime: "29/09/2024",
    eventType: "Swimming",
    details: "Geyser activity in lake due to hotspot migration. Most likely forming a new hotspring"
  },
  {
    latitude: 49.45051837,
    longitude: -122.9631776,
    submissionTime: "01/09/2024",
    expirationTime: "15/09/2024",
    eventType: "Boil Water",
    details: "High traces of Hepatitis A found in water source"
  },
  {
    latitude: 49.04274939,
    longitude: -125.7122047,
    submissionTime: "22/08/2024",
    expirationTime: "05/09/2024",
    eventType: "Animal Sighting",
    details: "Saltwater Crocodile and female great white shark seen fighting off coast of beach"
  },
  {
    latitude: 50.37630259,
    longitude: -126.9531217,
    submissionTime: "06/09/2024",
    expirationTime: "20/09/2024",
    eventType: "Swimming",
    details: "pH balance of lake recorded at 0 due to sulfur from volcanic activity"
  },
  {
    latitude: 49.36088498,
    longitude: -123.1092398,
    submissionTime: "11/09/2024",
    expirationTime: "25/09/2024",
    eventType: "Boil Water",
    details: "High traces of norovirus detected in water supply"
  },
  {
    latitude: 49.58404622,
    longitude: -123.5804984,
    submissionTime: "17/09/2024",
    expirationTime: "01/10/2024",
    eventType: "Animal Sighting",
    details: "Sasquatch possibly sighted at the edge of forest. Proceed with caution"
  },
  {
    latitude: 48.88879286,
    longitude: -123.5405334,
    submissionTime: "12/09/2024",
    expirationTime: "26/09/2024",
    eventType: "Swimming",
    details: "Recent volcanic activity created highly acidic carbonic waters that will melt skin off the bone"
  },
  {
    latitude: 49.2039286,
    longitude: -122.5532464,
    submissionTime: "09/09/2024",
    expirationTime: "23/09/2024",
    eventType: "Boil Water",
    details: "Water is purple, we don't know why, boil it I guess"
  },
  {
    latitude: 49.02160488,
    longitude: -122.806685,
    submissionTime: "31/08/2024",
    expirationTime: "14/09/2024",
    eventType: "Animal Sighting",
    details: "Large gathering of poisonous red jellyfish seen off coast of beach."
  },
  {
    latitude: 48.80042143,
    longitude: -123.6625215,
    submissionTime: "05/09/2024",
    expirationTime: "19/09/2024",
    eventType: "Swimming",
    details: "Lake dried up. No swimming"
  },
  {
    latitude: 49.06086151,
    longitude: -121.9726603,
    submissionTime: "09/09/2024",
    expirationTime: "23/09/2024",
    eventType: "Boil Water",
    details: "700 barrels of wine has crashed into water supply, contaminating local drinking water"
  },
  {
    latitude: 48.63588153,
    longitude: -123.4205008,
    submissionTime: "30/08/2024",
    expirationTime: "13/09/2024",
    eventType: "Animal Sighting",
    details: "Red Ants and Black Ants have ended their thousand-year war and are combining forces, the hills are really big"
  },
  {
    latitude: 49.35601779,
    longitude: -125.1112246,
    submissionTime: "05/09/2024",
    expirationTime: "19/09/2024",
    eventType: "Swimming",
    details: "Active landslide has caused river to flow into lake, creating currents and unclear water"
  },
  {
    latitude: 49.01828909,
    longitude: -123.0802036,
    submissionTime: "15/09/2024",
    expirationTime: "01/10/2024",
    eventType: "Boil Water",
    details: "Lead from concrete pipes seeping into water, boiling won't help, use bottled water for consumption."
  },
  {
    latitude: 48.59665847,
    longitude: -123.44261,
    submissionTime: "01/09/2024",
    expirationTime: "01/10/2024",
    eventType: "Animal Sighting",
    details: "Jersey Devil Spotted stealing apples from orchard"
  },
  {
    latitude: 48.44858106,
    longitude: -123.5301164,
    submissionTime: "22/08/2024",
    expirationTime: "05/09/2024",
    eventType: "Swimming",
    details: "A recent fissure in lake ground has caused a massive whirlpool that is pulling debris and living things into the unknown. Bring a floaty."
  },
  {
    latitude: 48.55408406,
    longitude: -123.7012425,
    submissionTime: "06/09/2024",
    expirationTime: "20/09/2024",
    eventType: "Boil Water",
    details: "Kool-Aid Man has taken over nearby reservoir, the water is red but it's fine to drink. Oh Yeah!"
  },
  {
    latitude: 48.91259788,
    longitude: -123.5438129,
    submissionTime: "11/09/2024",
    expirationTime: "25/09/2024",
    eventType: "Animal Sighting",
    details: "A wild Lugia has appeared!"
  },
  {
    latitude: 48.51344607,
    longitude: -123.4414593,
    submissionTime: "17/09/2024",
    expirationTime: "01/10/2024",
    eventType: "Swimming",
    details: "Lake is Frozen, No Diving!"
  },
  {
    latitude: 49.1349886,
    longitude: -123.9321392,
    submissionTime: "31/08/2024",
    expirationTime: "14/08/2024",
    eventType: "Boil Water",
    details: "Tea bags have been prepped in the mugs. Don't forget to add honey!"
  },
  {
    latitude: 49.18443958,
    longitude: -123.135359,
    submissionTime: "09/09/2024",
    expirationTime: "23/09/2024",
    eventType: "Animal Sighting",
    details: "Ancient Red Dragon brooding near the shore"
  }
]);
