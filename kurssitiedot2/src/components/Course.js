const Header = ({ courses }) => {
    return (
      <h1>{courses.name}</h1>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>   
    )
  }
  
  const Content = ({ courses }) => {
    console.log(courses)
    return (
      <div>
          {courses.map(course => <Part key={course.id} name={course.name} exercises={course.exercises} /> )} 
      </div>
    )
  }
  
  const Total = ({ courses }) => {
    const totalSum = courses.map(course => course.exercises)
    const total = totalSum.reduce((a, b) => a + b)
  
    return(
      <p>Number of exercises {total}</p>
    ) 
  }
  
  const Course = ({ courses }) => {
    return(
      <div>
        <Header courses={courses[0]} />
        <Content courses={courses[0].parts} />
        <Total courses={courses[0].parts} />
        <Header courses={courses[1]} />
        <Content courses={courses[1].parts} />
        <Total courses={courses[1].parts} />
      </div>
    )
  }

export default Course