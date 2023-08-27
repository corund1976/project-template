const formatDate = (dateTime) => {
  // 1677013200000 -> 16-02-2023
  const date = new Date(dateTime)
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  const month =
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

export default formatDate