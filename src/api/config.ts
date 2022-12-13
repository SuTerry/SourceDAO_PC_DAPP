const env = process.env.WEB_ENV

// exam
export const EXAM_ADDRESS = (env === 'pro') ? ''
  : (env === 'pre' ? ''
    : (env === 'sit' ? ''
      : (env === 'dev' ? ''
        : '0x818eB9D8C179A704E548Ac2dE10C3f380778fa85')))

// reward
export const REWARD_ADDRESS = (env === 'pro') ? ''
  : (env === 'pre' ? ''
    : (env === 'sit' ? ''
      : (env === 'dev' ? ''
        : '0x0f26780c35fd73173BD340121047bB28f4FCcBC9')))