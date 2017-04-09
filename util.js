const getLastDay = (date) => new Date(date - 24 * 3600 * 1000)

const formatDate = (date) => {
	let year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDate()

	let hour = date.getHours()
	let minute = date.getMinutes()
	let second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('')
}

const formatNumber = (number) => {
	number = number.toString()
	return number[1] ? number : '0' + number
}

module.exports = {
	formatDate: formatDate,
	getLastDay: getLastDay
}