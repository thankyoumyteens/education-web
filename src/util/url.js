/**
 * Created by Admin on 2017/8/24.
 */
export function getUrl () {
  let host = 'http://localhost:9999/course/' // 开发用
  // let host = '/course/' // 发布用
  return {
    'imageCode': host + 'imageCode',
    'login': host + 'login',
    'register': host + 'register',
    'simulation': host + 'simulation',
    'exams': host + 'exams',
    'course': host + 'course',
    'updateProfile': host + 'updateProfile'
  }
}

export function getHost () {
  let host = 'http://localhost:9999/course' // 开发用
  // let host = '/course' // 发布用
  return host
}
