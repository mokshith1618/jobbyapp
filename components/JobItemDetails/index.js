import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import {MdWork, MdLocationOn} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import Skills from '../Skills'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

const convertSnakeCaseToCamelCaseJobDetails = jobDetails => {
  const updatedData = {
    companyLogoUrl: jobDetails.company_logo_url,
    companyWebsiteUrl: jobDetails.company_website_url,
    employmentType: jobDetails.employment_type,
    id: jobDetails.id,
    jobDescription: jobDetails.job_description,
    skills: jobDetails.skills.map(eachItem => ({
      imageUrl: eachItem.image_url,
      name: eachItem.name,
    })),
    lifeAtCompany: {
      description: jobDetails.life_at_company.description,
      imageUrl: jobDetails.life_at_company.image_url,
    },
    location: jobDetails.location,
    rating: jobDetails.rating,
    title: jobDetails.title,
    packagePerAnnum: jobDetails.package_per_annum,
  }
  return updatedData
}

const convertSnakeCaseToCamelCaseSimilarJobs = similarJobs => {
  const updatedData = similarJobs.map(eachItem => ({
    companyLogoUrl: eachItem.company_logo_url,
    employmentType: eachItem.employment_type,
    id: eachItem.id,
    jobDescription: eachItem.job_description,
    location: eachItem.location,
    rating: eachItem.rating,
    title: eachItem.title,
  }))
  return updatedData
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    jobDataStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      jobDataStatus: apiStatus.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    console.log(jobDetailsApiUrl)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobDetailsApiUrl, options)
    console.log(response)
    console.log(response.ok === true)
    if (response.ok === true) {
      const data = await response.json()
      const jobDetails = convertSnakeCaseToCamelCaseJobDetails(data.job_details)
      const similarJobs = convertSnakeCaseToCamelCaseSimilarJobs(
        data.similar_jobs,
      )
      this.setState({
        jobDataStatus: apiStatus.success,
        jobDetails,
        similarJobs,
      })
    } else {
      this.setState({
        jobDataStatus: apiStatus.failure,
      })
    }
  }

  renderJobDetails = () => {
    const {jobDetails, similarJobs, jobDataStatus} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      rating,
      title,
      packagePerAnnum,
    } = jobDetails
    console.log(jobDataStatus)
    switch (jobDataStatus) {
      case apiStatus.inProgress:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
          </div>
        )
      case apiStatus.failure:
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for.</p>
            <button type="button" onClick={this.getJobDetails}>
              Retry
            </button>
          </div>
        )
      case apiStatus.success:
        console.log('l')
        return (
          <div>
            <div>
              <div>
                <img src={companyLogoUrl} alt="job details company logo" />
                <div>
                  <h1>{title}</h1>
                  <div>
                    <BsFillStarFill />
                    <p>{rating}</p>
                  </div>
                </div>
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
              <div>
                <div>
                  <h1>Description</h1>
                  <a href={companyWebsiteUrl}>
                    <p>Visit</p>
                    <FiExternalLink />
                  </a>
                </div>
                <p>{jobDescription}</p>
              </div>
              <div>
                <h1>SKills</h1>
                <ul>
                  {skills.map(eachItem => (
                    <Skills skillDetails={eachItem} key={eachItem.id} />
                  ))}
                </ul>
              </div>
              <div>
                <h1>Life at Company</h1>
                <div>
                  <p>{lifeAtCompany.description}</p>
                  <img src={lifeAtCompany.imageUrl} alt="life at company" />
                </div>
              </div>
            </div>
            <div>
              <h1>Similar Jobs</h1>
              <ul>
                {similarJobs.map(eachItem => (
                  <SimilarJobs jobDetails={eachItem} key={eachItem.id} />
                ))}
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderJobDetails()}
      </div>
    )
  }
}

export default JobItemDetails
