const EmploymentType = props => {
  const {employmentTypeDetails, changeEmploymentType} = props
  const {employmentTypeId, label} = employmentTypeDetails
  const onClick = event => {
    changeEmploymentType(event.target.value)
  }
  return (
    <li>
      <input
        id={employmentTypeId}
        type="checkbox"
        value={employmentTypeId}
        onChange={onClick}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default EmploymentType
