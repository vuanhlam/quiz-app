
import CountDown from '../CountDown/CountDown';
import './QuestionList.scss'

function QuestionList(props) {

  const { questionLength, index , setIndex} = props;

  const onTimeUp = () => {
    props.handleSubmit();
  }

  return (
    <div className="QuestionList-Wrapper">
        <div className='header'>
            <div className='mark-question'>
                mark question
            </div>
            <div className='count-down-timer'>
                <CountDown onTimeUp={onTimeUp}/>
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