import {BsFillStarFill} from 'react-icons/bs'
import {MdWork, MdLocationOn} from 'react-icons/md'

const SimilarJobs = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    jobDescription,
    rating,
    title,
    location,
    employmentType,
  } = jobDetails
  return (
    <li>
      <div>
        <img src={companyLogoUrl} alt="similar job company logo" />
        <div>
          <h1>{title}</h1>
          <div>
            <BsFillStarFill />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobs
