const Skills = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}

export default Skills
