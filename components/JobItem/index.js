import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import {MdWork, MdLocationOn} from 'react-icons/md'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  console.log('l')
  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <div>
          <img src={companyLogoUrl} alt="company logo" />
          <h1>{title}</h1>
          <div>
            <BsFillStarFill />
            <p>{rating}</p>
          </div>
          <div>
            <div>
              <MdLocationOn />
              <p>{location}</p>
            </div>
            <div>
              <MdWork />
              <p>{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <div>
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
