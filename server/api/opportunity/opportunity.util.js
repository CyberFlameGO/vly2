const Opportunity = require('./opportunity')
const { regions } = require('../location/locationData')

/**
 *
 * @param {{ locations: string[], _id }} me
 * @returns {Promise<any[]>}
 */
const getLocationRecommendations = async (me) => {
  const regionsToMatch = regions.filter(loc =>
    me.locations.includes(loc.name) ||
      !!loc.containedTerritories.find(containedTerritory => me.locations.includes(containedTerritory))
  )

  if (regionsToMatch.length === 0) {
    return []
  }

  // Extract all region names and the territories of those regions
  // e.g. ['Bay of Plenty', 'Western Bay of Plenty District', 'Tauranga City', ..., 'Waikato', 'Thames-Coromandel District', 'Taupo District', ...]
  const regionNames = regionsToMatch.flatMap(region => [region.name, ...region.containedTerritories])

  let locationOps = await Opportunity
    .find({
      location: { $in: regionNames },
      requestor: { $ne: me._id }
    })
    .sort('name')
    .collation({ locale: 'en_US', strength: 1 })
    .populate('requestor', 'name nickname imgUrl')
    .populate('offerOrg', 'name imgUrl category')

  // if user has specified a territory, we should show the exact matches first, because we know
  // they are closest to the user.
  const userIsInTerritory = !me.locations.includes(regionNames)
  if (userIsInTerritory) {
    const closestOpportunities = locationOps.filter((opportunity) => me.locations.includes(opportunity.location))
    const otherOpportunities = locationOps.filter((opportunity) => !me.locations.includes(opportunity.location))

    locationOps = closestOpportunities.concat(otherOpportunities)
  }

  return locationOps.slice(0, 10)
}

const getSkillsRecommendations = async (me) => {
  const tagsToMatch = me.tags

  // mongoose isn't happy if we provide an empty array as an expression
  if (tagsToMatch.length > 0) {
    const opsWithMatchingTags = await Opportunity
      .find({
        tags: { $in: tagsToMatch },
        requestor: { $ne: me._id }
      })
      .populate('requestor', 'name nickname imgUrl')
      .populate('offerOrg', 'name imgUrl category')
    const opsWithCounts = []

    opsWithMatchingTags.forEach(op => {
      let count = 0
      op.tags.forEach(tag => {
        if (tagsToMatch.includes(tag)) {
          count++
        }
      })

      opsWithCounts.push({ count, op })
    })

    opsWithCounts.sort((a, b) => {
      return b.count - a.count
    })

    return opsWithCounts.map(op => op.op).slice(0, 10)
  } else {
    return []
  }
}

module.exports = { getLocationRecommendations, getSkillsRecommendations }
