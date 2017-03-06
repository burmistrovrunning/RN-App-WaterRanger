import t from 'tcomb-form-native';

const IssueType = t.enums({
  algae: 'Algae',
  water_quality: 'Water Quality',
  pollution: 'Pollution',
  shoreline: 'Shoreline',
  wildlife: 'Wildlife',
  other: 'Other'
});

export const AddIssueForm = t.struct({
  bodyOfWater: t.String,
  locationName: t.maybe(t.String),
  locationDescription: t.maybe(t.String),
  date: t.Date,
  category: IssueType,
  description: t.maybe(t.String),
  weather: t.maybe(t.String),
  seenBefore: t.maybe(t.Boolean),
  notifiedAgencies: t.maybe(t.String),
  contactEmail: t.maybe(t.String),
  contactPhone: t.maybe(t.String)
});
export const getIssue = (form) => {
  const value = form.getValue();
  return {
    observed_on: new Date().toJSON(),
    group_tokens: '',
    category: value.category,
    notes: {
      details: value.description || '',
      weather: value.weather || '',
      seen_before: value.seenBefore || false,
      notified_agencies: value.notifiedAgencies || ''
    },
    contact_info: {
      email: value.contactEmail || '',
      phone: value.contactPhone || ''
    }
  };
};
