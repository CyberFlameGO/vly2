import test from 'ava'
import express from 'express'
import PubSub from 'pubsub-js'
import { TOPIC_PERSON__CREATE, TOPIC_MEMBER__UPDATE, TOPIC_INTEREST__UPDATE, TOPIC_PERSON__EMAIL_SENT } from '../../../services/pubsub/topic.constants'
import MemoryMongo from '../../../util/test-memory-mongo'
import Person from '../person'
import people from './person.fixture'
import Organisation from '../../organisation/organisation'
import orgs from '../../organisation/__tests__/organisation.fixture'
import Opportunity from '../../opportunity/opportunity'
import ops from '../../opportunity/__tests__/opportunity.fixture'
import Subscribe from '../person.subscribe.js'
import { MemberStatus } from '../../member/member.constants'
import { InterestStatus } from '../../interest/interest.constants'
import sinon from 'sinon'

test.before('before connect to database', async (t) => {
  t.context.server = express()
  Subscribe(t.context.server)
  t.context.memMongo = new MemoryMongo()
  await t.context.memMongo.start()
  t.context.people = await Person.create(people)
  t.context.orgs = await Organisation.create(orgs)
  // setup opportunities 5 items
  ops.map((op, index) => {
    // each op has a different person as requestor, but not me
    op.requestor = t.context.people[index + 1]
    // all the ops belong to the OMGTech org
    op.offerOrg = t.context.orgs[1]
  })
  t.context.ops = await Opportunity.create(ops)
  t.context.andrew = t.context.people[0]
})

test.after.always(async (t) => {
  await t.context.memMongo.stop()
})

test('Trigger TOPIC_PERSON__CREATE', async t => {
  t.plan(2)

  const newPerson = t.context.people[0]
  const done = new Promise((resolve, reject) => {
    PubSub.subscribe(TOPIC_PERSON__EMAIL_SENT, async (msg, info) => {
      t.is(info.response, 'nodemailer-mock success')
      resolve(true)
    })
  })
  t.true(PubSub.publish(TOPIC_PERSON__CREATE, newPerson))
  await done
})

test('Trigger TOPIC_MEMBER__UPDATE', async t => {
  t.plan(2)

  const newMember = {
    person: t.context.people[0],
    organisation: t.context.orgs[0],
    validation: 'follower',
    status: MemberStatus.FOLLOWER
  }
  const done = new Promise((resolve, reject) => {
    PubSub.subscribe(TOPIC_PERSON__EMAIL_SENT, async (msg, info) => {
      t.is(info.response, 'nodemailer-mock success')
      resolve(true)
    })
  })
  t.true(PubSub.publish(TOPIC_MEMBER__UPDATE, newMember))
  await done
})

test('TOPIC_MEMBER__UPDATE for exmember sends no email', async t => {
  t.plan(1)

  const newMember = {
    person: t.context.people[0],
    organisation: t.context.orgs[0],
    validation: 'exmember',
    status: MemberStatus.EXMEMBER
  }

  t.true(PubSub.publish(TOPIC_MEMBER__UPDATE, newMember))
  // There's no way to check for something that doesn't happen.
  // but at least we can run the code.
})

test('Trigger TOPIC_INTEREST__UPDATE INTERESTED', async t => {
  t.plan(4)
  let callcount = 0
  const spy = sinon.spy()
  const newInterest = {
    person: t.context.people[0],
    opportunity: t.context.ops[0],
    comment: 'test update email',
    status: InterestStatus.INTERESTED
  }
  const done = new Promise((resolve, reject) => {
    PubSub.subscribe(TOPIC_PERSON__EMAIL_SENT, async (msg, info) => {
      t.is(info.response, 'nodemailer-mock success')
      spy()
      callcount++
      if (callcount === 2) { resolve(true) }
    })
  })
  t.true(PubSub.publish(TOPIC_INTEREST__UPDATE, newInterest))
  await done
  t.true(spy.calledTwice)
})

test('Trigger TOPIC_INTEREST__UPDATE INVITED', async t => {
  t.plan(4)
  let callcount = 0
  const spy = sinon.spy()
  const newInterest = {
    person: t.context.people[0],
    opportunity: t.context.ops[0],
    comment: 'test update email',
    status: InterestStatus.INVITED
  }
  const done = new Promise((resolve, reject) => {
    PubSub.subscribe(TOPIC_PERSON__EMAIL_SENT, async (msg, info) => {
      t.is(info.response, 'nodemailer-mock success')
      spy()
      callcount++
      if (callcount === 2) { resolve(true) }
    })
  })
  t.true(PubSub.publish(TOPIC_INTEREST__UPDATE, newInterest))
  await done
  t.true(spy.calledTwice)
})

test('Trigger TOPIC_INTEREST__UPDATE COMMITTED', async t => {
  t.plan(3)
  const spy = sinon.spy()
  const newInterest = {
    person: t.context.people[0],
    opportunity: t.context.ops[0],
    comment: 'test update email',
    status: InterestStatus.COMMITTED
  }
  const done = new Promise((resolve, reject) => {
    PubSub.subscribe(TOPIC_PERSON__EMAIL_SENT, async (msg, info) => {
      t.is(info.response, 'nodemailer-mock success')
      spy()
      resolve(true)
    })
  })
  t.true(PubSub.publish(TOPIC_INTEREST__UPDATE, newInterest))
  await done
  t.true(spy.calledOnce)
})
