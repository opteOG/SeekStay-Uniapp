export function formatDate(date) {
	if(!date) return null
	return `${date?.getFullYear()}年${date?.getMonth() + 1}月${date?.getDate()}日`
}