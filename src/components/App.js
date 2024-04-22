import React, { useState } from 'react'
import '../styles/App.css'

function App() {
	const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	]

	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

	const getDaysInMonth = (month, year) => {
		return new Date(year, month + 1, 0).getDate()
	}

	const getFirstDayOfMonth = (month, year) => {
		return new Date(year, month, 1).getDay()
	}

	const handleMonthChange = (e) => {
		setSelectedMonth(parseInt(e.target.value))
	}

	const handleYearChange = (e) => {
		setSelectedYear(parseInt(e.target.value))
	}

	const prevMonth = () => {
		setSelectedMonth((prevMonth) => {
			let prevMonthValue = prevMonth - 1
			let prevYearValue = selectedYear
			if (prevMonthValue < 0) {
				prevMonthValue = 11
				prevYearValue--
			}
			setSelectedYear(prevYearValue)
			return prevMonthValue
		})
	}

	const nextMonth = () => {
		setSelectedMonth((nextMonth) => {
			let nextMonthValue = nextMonth + 1
			let nextYearValue = selectedYear
			if (nextMonthValue > 11) {
				nextMonthValue = 0
				nextYearValue++
			}
			setSelectedYear(nextYearValue)
			return nextMonthValue
		})
	}

	const renderCalendar = () => {
		const daysInMonth = getDaysInMonth(selectedMonth, selectedYear)
		const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear)
		const calendar = []

		let day = 1
		for (let i = 0; i < 6; i++) {
			const week = []
			for (let j = 0; j < 7; j++) {
				if ((i === 0 && j < firstDay) || day > daysInMonth) {
					week.push(<td key={j}></td>)
				} else {
					week.push(<td key={j}>{day}</td>)
					day++
				}
			}
			calendar.push(<tr key={i}>{week}</tr>)
			if (day > daysInMonth) break
		}

		return calendar
	}

	return (
		<div className="App">
			<h1>Calendar</h1>
			<div className="controls">
				<select value={selectedMonth} onChange={handleMonthChange}>
					{months.map((month, index) => (
						<option key={index} value={index}>
							{month}
						</option>
					))}
				</select>
				<span
					className="year"
					onDoubleClick={() => setSelectedYear('')}
				>
					{selectedYear}
				</span>
				<input
					type="number"
					value={selectedYear}
					onChange={handleYearChange}
					onBlur={() => setSelectedYear(parseInt(selectedYear))}
					style={{
						display: selectedYear === '' ? 'inline-block' : 'none'
					}}
				/>
				<button onClick={prevMonth}>Prev Month</button>
				<button onClick={nextMonth}>Next Month</button>
			</div>
			<table className="calendar">
				<thead>
					<tr>
						{daysOfWeek.map((day, index) => (
							<th key={index}>{day}</th>
						))}
					</tr>
				</thead>
				<tbody>{renderCalendar()}</tbody>
			</table>
		</div>
	)
}

export default App
