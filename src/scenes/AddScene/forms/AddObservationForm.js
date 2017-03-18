import t from 'tcomb-form-native';
import _ from 'lodash';

const WildlifeType = t.struct({
  Mammal: t.maybe(t.Boolean),
  Reptile: t.maybe(t.Boolean),
  Amphibian: t.maybe(t.Boolean),
  Fish: t.maybe(t.Boolean),
  Plant: t.maybe(t.Boolean),
  Insect: t.maybe(t.Boolean),
  Bird: t.maybe(t.Boolean),
  'Species at risk': t.maybe(t.Boolean),
  Crustacean: t.maybe(t.Boolean),
  Fungi: t.maybe(t.Boolean)
});

const InvasiveSpeciesType = t.struct({
  Phragmites: t.maybe(t.Boolean),
  Loosestrife: t.maybe(t.Boolean),
  'Zebra Mussels': t.maybe(t.Boolean),
  'Other Invasive': t.maybe(t.Boolean),
  'Eurasian Milfoil': t.maybe(t.Boolean),
  'European Frog-bit': t.maybe(t.Boolean),
  'European Water Chestnut': t.maybe(t.Boolean),
  'Yellow Iris': t.maybe(t.Boolean),
  'Yellow Floating Heart': t.maybe(t.Boolean),
  'Bloody Red Shrimp': t.maybe(t.Boolean),
  'Rusty Crayfish': t.maybe(t.Boolean),
  'Spiny Waterfleas': t.maybe(t.Boolean)
});

export const AddObservationForm = t.struct({
  bodyOfWater: t.String,
  locationName: t.maybe(t.String),
  locationDescription: t.maybe(t.String),
  date: t.Date,
  wildlife: t.maybe(WildlifeType),
  invasiveSpecies: t.maybe(InvasiveSpeciesType),
  ph: t.maybe(t.Number),
  waterTemp: t.maybe(t.Number),
  airTemp: t.maybe(t.Number),
  dissolvedOxygen: t.maybe(t.Number),
  eColi: t.maybe(t.Number),
  otherColiform: t.maybe(t.Number),
  totalColiform: t.maybe(t.Number),
  conductivity: t.maybe(t.Number),
  alkalinity: t.maybe(t.Number),
  hardness: t.maybe(t.Number),
  turbidity: t.maybe(t.Number),
  kjeldahlNitrogen: t.maybe(t.Number),
  phosphorus: t.maybe(t.Number),
  salinity: t.maybe(t.Number),
  phosphates: t.maybe(t.Number),
  secchiDepth: t.maybe(t.Number),
  nitrites: t.maybe(t.Number),
  nitrates: t.maybe(t.Number),
  iceWatch: t.maybe(t.Boolean),
  notes: t.maybe(t.String)
});

export const getObservation = (form, groupValue) => {
  const value = form.getValue();
  if (value) {
    const wildlife = [];
    _.map(value.wildlife, (itemValue, key) => {
      if (itemValue) {
        wildlife.push(key);
      }
    });
    if (wildlife.length === 0) {
      wildlife.push('');
    }
    const invasiveSpecies = [];
    _.map(value.invasiveSpecies, (itemValue, key) => {
      if (itemValue) {
        invasiveSpecies.push(key);
      }
    });
    if (invasiveSpecies.length === 0) {
      invasiveSpecies.push('');
    }
    return {
      observed_on: new Date().toJSON(),
      notes: value.notes,
      group_tokens: groupValue.toString(),
      data: {
        wildlife,
        invasive_species: invasiveSpecies,
        ph: (value.ph || '').toString(),
        water_temperature: (value.waterTemp || '').toString(),
        air_temperature: (value.airTemp || '').toString(),
        oxygen: (value.dissolvedOxygen || '').toString(),
        ecoli: (value.eColi || '').toString(),
        conductivity: (value.conductivity || '').toString(),
        alkalinity: (value.alkalinity || '').toString(),
        hardness: (value.hardness || '').toString(),
        turbidity: (value.turbidity || '').toString(),
        total_kjeldahl_nitrogen: (value.kjeldahlNitrogen || '').toString(),
        total_phosphorus: (value.phosphorus || '').toString(),
        salinity: (value.salinity || '').toString(),
        water_depth: (value.secchiDepth || '').toString(),
        ice: value.iceWatch ? 'on' : 'off'
      }
    };
  }
  return null;
};
