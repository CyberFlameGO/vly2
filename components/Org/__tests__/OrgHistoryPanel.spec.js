import test from 'ava'
import adapterFetch from 'redux-api/lib/adapters/fetch'
import { mountWithIntl, mountWithMockIntl } from '../../../lib/react-intl-test-helper'
import { OrgHistoryPanel } from '../OrgHistoryPanel'
import { Provider } from 'react-redux'
import fetchMock from 'fetch-mock'
import reduxApi, { makeStore } from '../../../lib/redux/reduxApi'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

test('No results', async t => {
  const expectedNotFoundMessage = 'archived opportunities not found message'
  const store = makeStore({})
  const myMock = fetchMock.sandbox()

  myMock
    .getOnce('path:/api/archivedOpportunities/', { body: [] })

  reduxApi.use('fetch', adapterFetch(myMock))

  const wrapper = mountWithMockIntl(
    <Provider store={store}>
      <OrgHistoryPanel organisationId='testorg' />
    </Provider>,
    {
      'orgTabs.history.notfound': expectedNotFoundMessage
    }
  )

  await myMock.flush(true)
  wrapper.update()

  const actualNotFoundMessage = wrapper.find('p').text()

  t.is(actualNotFoundMessage, expectedNotFoundMessage)
})

test('Results', async t => {
  const store = makeStore({})
  const myMock = fetchMock.sandbox()

  const results = [{
    name: 'test1',
    subtitle: 'test',
    imgUrl: 'test.jpg',
    date: ['2017-09-03', '2013-07-26'],
    location: 'Testington',
    duration: 'long time',
    _id: 'id1'
  }, {
    name: 'test2',
    subtitle: 'test',
    imgUrl: 'test.jpg',
    date: ['2017-09-03', '2013-07-26'],
    location: 'Testington',
    duration: 'long time',
    _id: 'id2'
  }]

  myMock
    .getOnce('path:/api/archivedOpportunities/', { body: results })

  reduxApi.use('fetch', adapterFetch(myMock))

  const wrapper = mountWithIntl(
    <Provider store={store}>
      <OrgHistoryPanel organisationId='testorg' />
    </Provider>
  )

  await myMock.flush(true)
  wrapper.update()

  t.is(wrapper.find('OpCard').length, results.length)
})

test('Error', t => {
  const expectedErrorMessage = 'Error loading previous opportunities: 500 Internal Server Error'

  const store = configureStore([thunk])({
    archivedOpportunities: {
      sync: false,
      syncing: false,
      loading: false,
      error: { status: 500, statusText: 'Internal Server Error' },
      data: []
    }
  })

  const wrapper = mountWithMockIntl(
    <Provider store={store}>
      <OrgHistoryPanel organisationId='testorg' />
    </Provider>,
    {
      'orgTabs.history.error': expectedErrorMessage
    }
  )

  const actualErrorText = wrapper.find('span.ant-alert-message').text()

  t.is(actualErrorText, expectedErrorMessage)
})

test('Loading', t => {
  const store = configureStore([thunk])({
    archivedOpportunities: {
      sync: false,
      syncing: false,
      loading: true,
      error: null,
      data: []
    }
  })

  const wrapper = mountWithIntl(
    <Provider store={store}>
      <OrgHistoryPanel organisationId='testorg' />
    </Provider>
  )

  t.true(wrapper.find('ReduxLoading').exists())
})
