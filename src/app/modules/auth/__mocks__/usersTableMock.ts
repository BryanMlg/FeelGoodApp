import {toAbsoluteUrl} from '../../../../_metronic/helpers'
// import {UserModel} from '../models/UserModel'

export class UsersTableMock {
  public static table: Array<any> = [
    {
      id: 1,
      username: 'Medico',
      password: 'demo',
      email: 'medico@demo.com',
      auth: {
        accessToken: 'access-token-8f3ae836da744329a6f93bf20594b5cc',
        refreshToken: 'access-token-f8c137a2c98743f48b643e71161d90aa',
      },
      roles: [1], // Administrator
      pic: toAbsoluteUrl('/media/avatars/150-2.jpg'),
      fullname: 'Sean S',
      firstname: 'Medico',
      lastname: 'Stark',
      occupation: 'CEO',
      companyName: 'Keenthemes',
      phone: '456669067890',
      language: 'en',
      timeZone: 'International Date Line West',
      website: 'https://keenthemes.com',
      emailSettings: {
        emailNotification: true,
        sendCopyToPersonalEmail: false,
        activityRelatesEmail: {
          youHaveNewNotifications: false,
          youAreSentADirectMessage: false,
          someoneAddsYouAsAsAConnection: true,
          uponNewOrder: false,
          newMembershipApproval: false,
          memberRegistration: true,
        },
        updatesFromKeenthemes: {
          newsAboutKeenthemesProductsAndFeatureUpdates: false,
          tipsOnGettingMoreOutOfKeen: false,
          thingsYouMissedSindeYouLastLoggedIntoKeen: true,
          newsAboutStartOnPartnerProductsAndOtherServices: true,
          tipsOnStartBusinessProducts: true,
        },
      },
      communication: {
        email: true,
        sms: true,
        phone: false,
      },
      address: {
        addressLine: 'L-12-20 Vertex, Cybersquare',
        city: 'San Francisco',
        state: 'California',
        postCode: '45000',
      },
      socialNetworks: {
        linkedIn: 'https://linkedin.com/admin',
        facebook: 'https://facebook.com/admin',
        twitter: 'https://twitter.com/admin',
        instagram: 'https://instagram.com/admin',
      },
    },
    {
      id: 2,
      username: 'Paciente',
      password: 'demo',
      email: 'paciente@demo.com',
      auth: {
        accessToken: 'access-token-6829bba69dd3421d8762-991e9e806dbf',
        refreshToken: 'access-token-f8e4c61a318e4d618b6c199ef96b9e55',
      },
      roles: [2], // Manager
      pic: toAbsoluteUrl('/media/avatars/150-1.jpg'),
      fullname: 'Megan F',
      firstname: 'Paciente',
      lastname: 'Fox',
      occupation: 'Deputy Head of Keenthemes in New York office',
      companyName: 'Keenthemes',
      phone: '456669067891',
      language: 'en',
      timeZone: 'International Date Line West',
      communication: {
        email: true,
        sms: true,
        phone: false,
      },
      emailSettings: {
        emailNotification: true,
        sendCopyToPersonalEmail: false,
        activityRelatesEmail: {
          youHaveNewNotifications: false,
          youAreSentADirectMessage: false,
          someoneAddsYouAsAsAConnection: true,
          uponNewOrder: false,
          newMembershipApproval: false,
          memberRegistration: true,
        },
        updatesFromKeenthemes: {
          newsAboutKeenthemesProductsAndFeatureUpdates: false,
          tipsOnGettingMoreOutOfKeen: false,
          thingsYouMissedSindeYouLastLoggedIntoKeen: true,
          newsAboutStartOnPartnerProductsAndOtherServices: true,
          tipsOnStartBusinessProducts: true,
        },
      },
      address: {
        addressLine: '3487  Ingram Road',
        city: 'Greensboro',
        state: 'North Carolina',
        postCode: '27409',
      },
      socialNetworks: {
        linkedIn: 'https://linkedin.com/user',
        facebook: 'https://facebook.com/user',
        twitter: 'https://twitter.com/user',
        instagram: 'https://instagram.com/user',
      },
    },
 
  ]
}
