
import './QuestionList.scss'

function QuestionList(props) {

  const { questionLength, index , setIndex} = props;

  return (
    <div className="QuestionList-Wrapper">
        <div className='header'>
            <div className='mark-question'>
                mark question
            </div>
            <div className='count-down-timer'>
                10:10
            </div>
            <div className='do-again'>
                do again
            </div>
        </div>
        <div className='questionList'>
            {   questionLength && questionLength.length > 0 &&
                questionLength.map((item, index) => {
                    return (
                        <div 
                            key={`item-${index}`} 
                            className='question'
                            onClick={() => setIndex(index)}
                        >
                            {index + 1}
                        </div>
                    )
                })
            }
        </div>
    </div>  
  )
}

export default QuestionList