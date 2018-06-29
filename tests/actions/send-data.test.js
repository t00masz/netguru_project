import * as types from '../../actions/action-types';
import { sendUserData } from '../../actions/send-data'
import today from '../../src/getDate'


test('passed if 0 errors are returned', () => {
    const action = sendUserData({
        name: `Jan`,
        lastName: `Kowalski`,
        email: `jan.kowalski@gmail.com`, 
        date: today(),
    });

    expect(action).toEqual({
        type: types.SEND_USER_DATA, 
        user: {
            name: '',
            lastName: '',
            email: '',
            date: today(),
            error: {
                name: '', 
                lastName: '',
                email: '', 
                date: ''
            }
          }
    })
})

test('passed if 4 errors are returned', () => {
    const action = sendUserData({
        name: `111`,
        lastName: ``,
        email: `jan.kowalski.com`, 
        date: '',
    });

    expect(action).toEqual({
        type: types.SEND_USER_DATA, 
        user: {
            name: `111`,
            lastName: ``,
            email: `jan.kowalski.com`, 
            date: '',
            error: {
                name: 'Name is incorrect.', 
                lastName: 'Last name is incorrect.',
                email: 'E-mail address is incorrect.', 
                date: 'Date is required.'
            }
          }
    })
})

test('passed if 0 errors are returned', () => {
    const action = sendUserData({
        name: `Jan22;`,
        lastName: `Kowalki11`,
        email: `;;@kowalski.com`, 
        date: '10-06-2018',
    });

    expect(action).toEqual({
        type: types.SEND_USER_DATA, 
        user: {
            name: `Jan22;`,
            lastName: `Kowalki11`,
            email: `;;@kowalski.com`, 
            date: '10-06-2018',
            error: {
                name: 'Name is incorrect.', 
                lastName: 'Last name is incorrect.',
                email: 'E-mail address is incorrect.', 
                date: 'This date has already passed.'
            }
          }
    })
})