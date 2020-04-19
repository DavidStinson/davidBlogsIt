import tokenService from "./tokenService";

const BASE_URL = "/api/topics/";

export function index() {
  const options = {
    method: "GET",
  };
  return fetch(BASE_URL, options).then((res) => res.json());
}

export function create(topic) {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    },
    body: JSON.stringify(topic),
  };
  return fetch(BASE_URL, options, { mode: "cors" }).then((res) => res.json());
}

export function deleteOne(id) {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  };
  return fetch(`${BASE_URL}/${id}`, options, { mode: "cors" }).then((res) =>
    res.json()
  );
}