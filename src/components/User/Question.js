import _ from 'lodash';

function Question(props) {
    const { question, index } = props;

    if (_.isEmpty(question)) {
        return <></>;
    }

    const handleCheckBox = (aId, qId) => {
        props.handleCheckBox(aId, qId)
    }

    return (
        <>
            {
                question.image 
                ?
                    <center>
                        <figure>
                            <img src={`data:image/png;base64, ${question.image}`} alt="question"/>
                        </figure>
                    </center>
                : 
                <div className='q-image'>

                </div>
            }
            
            <h2 className="question-title">
                <center>
                    <span>Question {index + 1}: </span>
                    <span className='quiz-title'>{question.questionDescription}</span>
                </center>
            </h2>
            <div className="answer">
                {question.answers &&
                    question.answers.length &&
                    question.answers.map((answer, index) => {
                        return (
                            <div key={`answer-${index}`} className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox"
                                    checked={answer.isSelected}
                                    onChange={(e) => handleCheckBox(answer.id, question.questionId)}
                                />
                                <label className="form-check-label" >
                                {answer.description}
                                </label>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

export default Question;
