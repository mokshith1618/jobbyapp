import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const Filters = props => {
  const {activeSalaryRange, changeSalaryRange, changeEmploymentType} = props
  return (
    <div>
      <div>
        <h1>Type of Employment</h1>
        <ul>
          {employmentTypesList.map(eachItem => (
            <EmploymentType
              employmentTypeDetails={eachItem}
              changeEmploymentType={changeEmploymentType}
              key={eachItem.id}
            />
          ))}
        </ul>
      </div>
      <div>
        <h1>Salary Range</h1>
        <ul>
          {salaryRangesList.map(eachItem => (
            <SalaryRange
              salaryRangeDetails={eachItem}
              key={eachItem.id}
              activeSalaryRange={activeSalaryRange}
              changeSalaryRange={changeSalaryRange}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Filters
