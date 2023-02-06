
import CountDown from '../CountDown/CountDown';
import './QuestionList.scss'

import { useRef } from 'react';

function QuestionList(props) {

  const { questionLength, setIndex} = props;
  const refDiv = useRef([]);

  const onTimeUp = () => {
    props.handleSubmit();
  }

  const getClassQuestion = (index, question) => {
        if(question && question.answers.length > 0 ){
            const checkAnswer = question.answers.find((item) => item.isSelected === true)
            if(checkAnswer) {
                return 'question selected'
            }
        }
        return 'question'
  }

  const handleClickQuestion = (index) => {
        setIndex(index)
        if(refDiv.current) {
            refDiv.current.forEach(item => {
                if(item && item.className === 'question clicked') {
                    item.className = 'question'
                }
            })
        }

        refDiv.current[index].className = 'question clicked'
        
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
                            className={getClassQuestion(index, item)}
                            onClick={() => handleClickQuestion(index)}
                            ref={element => refDiv.current[index] = element}
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