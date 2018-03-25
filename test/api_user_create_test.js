import http from "k6/http";
import {
  check,
  sleep
} from "k6";
var Mock = require('./node_modules/mockjs/dist/mock.js')

const baseURL = "http://sea.robber.happygod.cn/api";

const mockTemplate = {
  'display_name': '@NAME',
  'battle_score|1-10000': 100,
  'battle_ship_id|1-20': 1
}

export let options = {
  vus: 100,
  duration: "10s"
};

export default function () {
  var userData = Mock.mock(mockTemplate)
  let headers = {
    "Content-Type": "application/json"
  };
  let res = http.post(baseURL + '/user/', JSON.stringify(userData), {
    headers: headers
  });
  check(res, {
    "post status was 200": (r) => r.status == 200,
    "post transaction time OK": (r) => r.timings.duration < 500
  });
};