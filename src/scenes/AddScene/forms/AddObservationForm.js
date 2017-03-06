import t from 'tcomb-form-native';

const WildlifeType = t.enums({
  Mammal: 'Mammal',
  Reptile: 'Reptile',
  Amphibian: 'Amphibian',
  Fish: 'Fish',
  Plant: 'Plant',
  Insect: 'Insect',
  Bird: 'Bird',
  Species: 'Species at risk'
});

const InvasiveSpeciesType = t.enums({
  Phragmites: 'Phragmites',
  Loosestrife: 'Loosestrife',
  'Dog-Strangling Vine': 'Dog-Strangling Vine',
  'Introduced Honeysuckle': 'Introduced Honeysuckle',
  'Zebra Mussels': 'Zebra Mussels',
  'Other Invasive': 'Other Invasive',
  'Eurasian Milfoil': 'Eurasian Milfoil',
  Goldfish: 'Goldfish'
});

export const AddObservationForm = t.struct({
  bodyOfWater: t.String,
  locationName: t.maybe(t.String),
  locationDescription: t.maybe(t.String),
  date: t.Date,
  wildlife: t.maybe(t.list(WildlifeType)),
  invasiveSpecies: t.maybe(t.list(InvasiveSpeciesType)),
  waterQualityPh: t.maybe(t.Number),
  waterQualityWaterTemp: t.maybe(t.Number),
  waterQualityAirTemp: t.maybe(t.Number),
  waterQualityDissolvedOxygen: t.maybe(t.Number),
  waterQualityEColi: t.maybe(t.Number),
  waterQualityConductivity: t.maybe(t.Number),
  waterQualityAlkalinity: t.maybe(t.Number),
  waterQualityHardness: t.maybe(t.Number),
  waterQualityTurbidity: t.maybe(t.Number),
  waterQualityKjeldahlNitrogen: t.maybe(t.Number),
  waterQualityPhosphorus: t.maybe(t.Number),
  waterQualitySalinity: t.maybe(t.Number),
  waterQualityPhosphates: t.maybe(t.Number),
  waterQualitySecchiDepth: t.maybe(t.Number),
  waterQualityNitrites: t.maybe(t.Number),
  waterQualityNitrates: t.maybe(t.Number),
  iceWatch: t.maybe(t.Boolean),
  notes: t.maybe(t.String)
});

export const getObservation = (form) => {
  const value = form.getValue();
  return {
    observed_on: new Date().toJSON(),
    notes: value.notes,
    group_tokens: '3',
    data: {
      wildlife: value.wildlife || [''],
      invasive_species: value.invasiveSpecies || [''],
      ph: value.waterQualityPh || '',
      water_temperature: value.waterQualityWaterTemp || '',
      air_temperature: value.waterQualityAirTemp || '',
      oxygen: value.waterQualityDissolvedOxygen || '',
      ecoli: value.waterQualityEColi || '',
      conductivity: value.waterQualityConductivity || '',
      alkalinity: value.waterQualityAlkalinity || '',
      hardness: value.waterQualityHardness || '',
      turbidity: value.waterQualityTurbidity || '',
      total_kjeldahl_nitrogen: value.waterQualityKjeldahlNitrogen || '',
      total_phosphorus: value.waterQualityPhosphorus || '',
      salinity: value.waterQualitySalinity || '',
      water_depth: value.waterQualitySecchiDepth || '',
      ice: value.iceWatch || false
    }
  };
};
