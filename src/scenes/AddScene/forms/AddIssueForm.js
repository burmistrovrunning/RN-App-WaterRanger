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
  seenBefore: t.maybe(t.String),
  notifiedAgencies: t.maybe(t.String),
  contactEmail: t.maybe(t.String),
  contactPhone: t.maybe(t.String)
});
export const getIssue = (form, groupValue) => {
  const value = form.getValue();
  if (value) {
    return {
      observed_on: new Date().toJSON(),
      category: value.category,
      notes: {
        details: (value.description || '').toString(),
        weather: (value.weather || '').toString(),
        seen_before: (value.seenBefore || '').toString(),
        notified_agencies: (value.notifiedAgencies || '').toString()
      },
      contact_info: {
        email: (value.contactEmail || '').toString(),
        phone: (value.contactPhone || '').toString()
      }
    };
  }
  return null;
};
