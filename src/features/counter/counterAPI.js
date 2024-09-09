// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export const fetchLocalData = async () => {
  // const result = await fetch(`${process.env.PUBLIC_URL}/data.json`)
  const result = await fetch(`data.json`)
  const obj  = await result.json()
  return obj.amount
}