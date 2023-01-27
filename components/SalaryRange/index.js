const SalaryRange = props => {
  const {activeSalaryRange, changeSalaryRange, salaryRangeDetails} = props
  const {salaryRangeId, label} = salaryRangeDetails
  const onClick = event => {
    changeSalaryRange(event.target.value)
  }
  return (
    <li>
      <input
        type="radio"
        id={salaryRangeId}
        value={salaryRangeId}
        onChange={onClick}
        checked={activeSalaryRange === salaryRangeId}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default SalaryRange
