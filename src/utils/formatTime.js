const formatTime = (dateTime) => {
  const date = new Date(dateTime)
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  return `${hours}:${minutes}`
}

export default formatTime