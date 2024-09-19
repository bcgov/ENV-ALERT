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
    submissionTime: new Date(2024, 8, 9, 15, 24, 12),
    expirationTime: new Date(2024, 8, 23, 11, 45, 33),
    eventType: "Swimming",
    details: "Blue Algae spotted in bloom at edge of lake",
  },
  {
    latitude: 48.41754055,
    longitude: -123.4863211,
    submissionTime: new Date(2024, 7, 31, 8, 17, 46),
    expirationTime: new Date(2024, 8, 14, 19, 12, 51),
    eventType: "Boil Water",
    details:
      "Water is of high turbidity (clarity) and should be boiled before consumption",
  },
  {
    latitude: 48.4670847,
    longitude: -123.4706702,
    submissionTime: new Date(2024, 8, 5, 10, 5, 9),
    expirationTime: new Date(2024, 8, 19, 14, 52, 39),
    eventType: "Animal Sighting",
    details: "Cougar sighting at park",
  },
  {
    latitude: 48.74187068,
    longitude: -124.7506556,
    submissionTime: new Date(2024, 8, 9, 23, 31, 27),
    expirationTime: new Date(2024, 8, 23, 5, 16, 44),
    eventType: "Swimming",
    details: "High ecoli detected in water of lake",
  },
  {
    latitude: 48.45431688,
    longitude: -123.3210171,
    submissionTime: new Date(2024, 7, 30, 12, 38, 12),
    expirationTime: new Date(2024, 8, 13, 6, 14, 23),
    eventType: "Boil Water",
    details: "Salmonella microbes have been detected in water supply",
  },
  {
    latitude: 49.52987383,
    longitude: -124.6409528,
    submissionTime: new Date(2024, 8, 5, 17, 28, 39),
    expirationTime: new Date(2024, 8, 19, 8, 34, 9),
    eventType: "Animal Sighting",
    details: "Black bear and 4 cubs spotted outside of residential park",
  },
  {
    latitude: 49.39607183,
    longitude: -126.3347032,
    submissionTime: new Date(2024, 8, 15, 9, 13, 49),
    expirationTime: new Date(2024, 8, 29, 3, 22, 45),
    eventType: "Swimming",
    details:
      "Geyser activity in lake due to hotspot migration. Most likely forming a new hotspring",
  },
  {
    latitude: 49.45051837,
    longitude: -122.9631776,
    submissionTime: new Date(2024, 8, 1, 16, 10, 59),
    expirationTime: new Date(2024, 8, 15, 12, 18, 36),
    eventType: "Boil Water",
    details: "High traces of Hepatitis A found in water source",
  },
  {
    latitude: 49.04274939,
    longitude: -125.7122047,
    submissionTime: new Date(2024, 7, 22, 7, 45, 12),
    expirationTime: new Date(2024, 8, 5, 16, 11, 27),
    eventType: "Animal Sighting",
    details:
      "Saltwater Crocodile and female great white shark seen fighting off coast of beach",
  },
  {
    latitude: 50.37630259,
    longitude: -126.9531217,
    submissionTime: new Date(2024, 8, 6, 11, 24, 19),
    expirationTime: new Date(2024, 8, 20, 18, 7, 35),
    eventType: "Swimming",
    details:
      "pH balance of lake recorded at 0 due to sulfur from volcanic activity",
  },
    {
    latitude: 49.36088498,
    longitude: -123.1092398,
    submissionTime: new Date(2024, 8, 11, 14, 7, 29),
    expirationTime: new Date(2024, 8, 25, 9, 12, 54),
    eventType: "Boil Water",
    details: "High traces of norovirus detected in water supply"
  },
  {
    latitude: 49.58404622,
    longitude: -123.5804984,
    submissionTime: new Date(2024, 8, 17, 8, 33, 19),
    expirationTime: new Date(2024, 9, 1, 17, 49, 37),
    eventType: "Animal Sighting",
    details: "Sasquatch possibly sighted at the edge of forest. Proceed with caution"
  },
  {
    latitude: 48.88879286,
    longitude: -123.5405334,
    submissionTime: new Date(2024, 8, 12, 16, 20, 7),
    expirationTime: new Date(2024, 8, 26, 13, 14, 23),
    eventType: "Swimming",
    details: "Recent volcanic activity created highly acidic carbonic waters that will melt skin off the bone"
  },
  {
    latitude: 49.2039286,
    longitude: -122.5532464,
    submissionTime: new Date(2024, 8, 9, 10, 42, 18),
    expirationTime: new Date(2024, 8, 23, 19, 34, 51),
    eventType: "Boil Water",
    details: "Water is purple, we don't know why, boil it I guess"
  },
  {
    latitude: 49.02160488,
    longitude: -122.806685,
    submissionTime: new Date(2024, 7, 31, 6, 19, 3),
    expirationTime: new Date(2024, 8, 14, 17, 58, 29),
    eventType: "Animal Sighting",
    details: "Large gathering of poisonous red jellyfish seen off coast of beach."
  },
  {
    latitude: 48.80042143,
    longitude: -123.6625215,
    submissionTime: new Date(2024, 8, 5, 22, 51, 36),
    expirationTime: new Date(2024, 8, 19, 7, 44, 12),
    eventType: "Swimming",
    details: "Lake dried up. No swimming"
  },
  {
    latitude: 49.06086151,
    longitude: -121.9726603,
    submissionTime: new Date(2024, 8, 9, 5, 12, 27),
    expirationTime: new Date(2024, 8, 23, 12, 32, 45),
    eventType: "Boil Water",
    details: "700 barrels of wine has crashed into water supply, contaminating local drinking water"
  },
  {
    latitude: 48.63588153,
    longitude: -123.4205008,
    submissionTime: new Date(2024, 7, 30, 20, 30, 59),
    expirationTime: new Date(2024, 8, 13, 9, 45, 13),
    eventType: "Animal Sighting",
    details: "Red Ants and Black Ants have ended their thousand-year war and are combining forces, the hills are really big"
  },
  {
    latitude: 49.35601779,
    longitude: -125.1112246,
    submissionTime: new Date(2024, 8, 5, 16, 26, 14),
    expirationTime: new Date(2024, 8, 19, 8, 32, 7),
    eventType: "Swimming",
    details: "Active landslide has caused river to flow into lake, creating currents and unclear water"
  },
  {
    latitude: 49.01828909,
    longitude: -123.0802036,
    submissionTime: new Date(2024, 8, 15, 13, 4, 19),
    expirationTime: new Date(2024, 9, 1, 10, 56, 43),
    eventType: "Boil Water",
    details: "Lead from concrete pipes seeping into water, boiling won't help, use bottled water for consumption."
  },
  {
    latitude: 48.59665847,
    longitude: -123.44261,
    submissionTime: new Date(2024, 8, 1, 18, 12, 17),
    expirationTime: new Date(2024, 9, 1, 15, 21, 51),
    eventType: "Animal Sighting",
    details: "Jersey Devil Spotted stealing apples from orchard"
  },
  {
    latitude: 48.44858106,
    longitude: -123.5301164,
    submissionTime: new Date(2024, 7, 22, 21, 55, 29),
    expirationTime: new Date(2024, 8, 5, 16, 33, 41),
    eventType: "Swimming",
    details: "A recent fissure in lake ground has caused a massive whirlpool that is pulling debris and living things into the unknown. Bring a floaty."
  },
  {
    latitude: 48.55408406,
    longitude: -123.7012425,
    submissionTime: new Date(2024, 8, 6, 14, 18, 11),
    expirationTime: new Date(2024, 8, 20, 9, 34, 52),
    eventType: "Boil Water",
    details: "Kool-Aid Man has taken over nearby reservoir, the water is red but it's fine to drink. Oh Yeah!"
  },
  {
    latitude: 48.91259788,
    longitude: -123.5438129,
    submissionTime: new Date(2024, 8, 11, 19, 48, 25),
    expirationTime: new Date(2024, 8, 25, 17, 14, 57),
    eventType: "Animal Sighting",
    details: "A wild Lugia has appeared!"
  },
  {
    latitude: 48.51344607,
    longitude: -123.4414593,
    submissionTime: new Date(2024, 8, 17, 8, 24, 39),
    expirationTime: new Date(2024, 9, 1, 7, 16, 45),
    eventType: "Swimming",
    details: "Lake is Frozen, No Diving!"
  },
  {
    latitude: 49.1349886,
    longitude: -123.9321392,
    submissionTime: new Date(2024, 7, 31, 11, 12, 7),
    expirationTime: new Date(2024, 7, 14, 13, 24, 18),
    eventType: "Boil Water",
    details: "Tea bags have been prepped in the mugs. Don't forget to add honey!"
  },
  {
    latitude: 49.18443958,
    longitude: -123.135359,
    submissionTime: new Date(2024, 8, 9, 9, 46, 35),
    expirationTime: new Date(2024, 8, 23, 8, 28, 51),
    eventType: "Animal Sighting",
    details: "Ancient Red Dragon brooding near bank"
  },
  {
    latitude: 48.98058525,
    longitude: -125.5828886,
    submissionTime: new Date(2024, 7, 30, 21, 12, 15),
    expirationTime: new Date(2024, 7, 14, 10, 54, 39),
    eventType: "Swimming",
    details: "Tsunami warning off beach"
  },
  {
    latitude: 49.3585375,
    longitude: -122.2948407,
    submissionTime: new Date(2024, 8, 5, 13, 34, 41),
    expirationTime: new Date(2024, 8, 19, 14, 7, 59),
    eventType: "Boil Water",
    details: "Water smells bad, but after boiling, it's okay and not smelly."
  }
]);
