export async function postData(url, PostData, fetchedDataHandler) {
  const request = {
    method: "POST",
    headers: { 'Content-Type': 'application/json', 'X-CSRFToken': window.csrfToken },
    body: JSON.stringify(PostData)
  };
  
  fetch(url, request)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.res === 1) {
        fetchedDataHandler(data.payload);
      }
    });
}
export async function fetchData(url, fetchedDataHandler) {
  //fun is the state change method
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  if (data.res === 1) {
    fetchedDataHandler(data.payload);
  }
}
export function categories_tree(inputData, parent_category = 0) {
  const result = [];

  for (const item of inputData) {
    if (item.parent_category === parent_category) {
      const { parent_category, ...rest } = item; // Exclude parent_id property
      const newItem = { ...rest, subcategory: categories_tree(inputData, item.id) };
      result.push(newItem);
    }
  }
  return result;
}
export function p(t,data) {
  console.log('=='+t+'=====');
  console.log(data);
  console.log('=========================');
}

export function stop(msg) {
  alert();
  console.log(msg);
}