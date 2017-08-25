/**
 * Created by Admin on 2017/8/24.
 */
export function getUrl () {
  let host = 'http://localhost:9999/'
  return {
    'login': host + 'login',
    'exams': host + 'exams',
    'course': host + 'course'
  }
}
