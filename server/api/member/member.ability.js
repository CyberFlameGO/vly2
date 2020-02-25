const { Role } = require('../../services/authorize/role')
const { Action } = require('../../services/abilities/ability.constants')
const { SchemaName, MemberStatus } = require('./member.constants')

const ruleBuilder = async (session) => {
  const anonRules = [{
    subject: SchemaName,
    action: Action.MANAGE,
    inverted: true
  }]

  const allRules = []

  if (session.me && session.me._id) {
    allRules.push({
      subject: SchemaName,
      action: [Action.LIST, Action.READ],
      conditions: { person: session.me._id }
    }, {
      subject: SchemaName,
      action: Action.CREATE,
      conditions: {
        person: session.me._id,
        status: { $in: [MemberStatus.JOINER, MemberStatus.FOLLOWER, MemberStatus.VALIDATOR] }
      }
    }, {
      subject: SchemaName,
      action: Action.UPDATE,
      conditions: {
        person: session.me._id,
        status: {
          $in: [
            MemberStatus.NONE,
            MemberStatus.JOINER,
            MemberStatus.FOLLOWER,
            MemberStatus.VALIDATOR,
            MemberStatus.EXMEMBER
          ]
        }
      }
    }, {
      subject: SchemaName,
      action: Action.DELETE,
      inverted: true
    })
  }

  const orgAdminRules = []

  if (session.me && session.me._id && session.me.role.includes(Role.ORG_ADMIN)) {
    orgAdminRules.push({
      subject: SchemaName,
      action: [Action.LIST, Action.READ, Action.CREATE, Action.UPDATE],
      conditions: { organisation: { $in: session.me.orgAdminFor } }
    })
  }

  const adminRules = [{
    subject: SchemaName,
    action: Action.MANAGE
  }]

  return {
    [Role.ANON]: anonRules,
    [Role.VOLUNTEER_PROVIDER]: allRules,
    [Role.OPPORTUNITY_PROVIDER]: allRules,
    [Role.ACTIVITY_PROVIDER]: allRules,
    [Role.ORG_ADMIN]: orgAdminRules,
    [Role.ADMIN]: adminRules
  }
}

module.exports = ruleBuilder
