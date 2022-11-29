const baseUrl = "https://unicolombo-2022.herokuapp.com/api";

export const getAll = async () => {
  return await fetch(baseUrl + "/productos", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data.results);
};

export const store = async (data) => {
  return await fetch(baseUrl + "/productos", {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const destroy = async (id) => {
  return await fetch(baseUrl + "/productos/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
